#!/bin/bash

# deploy script
# <linos>

# A better class of script...
set -o errexit  # Exit on most errors (see the manual)
set -o errtrace # Make sure any error trap is inherited
set -o nounset  # Disallow expansion of unset variables
set -o pipefail # Use last non-zero exit code in a pipeline
#set -o xtrace          # Trace the execution of the script (debug)

# DESC: install services
# ARGS: None
# OUTS: None
function deploy(){
    echo "deploying linos connect inventory api services"

    echo "Deployment Environment: $LINOS_DEPLOYMENT_ENV"

    helm repo add linos-helm ${LINOS_ARTIFACTORY_HOST_URL}/linos-helm --username ${LINOS_HOST_REPOSITORY_USERNAME} --password ${LINOS_HOST_REPOSITORY_SECRET}
    helm repo update

    helm upgrade --install ${LINOS_PLATFORM_COMPONENT_NAME} linos-helm/linos-helm-chart \
        --values config/${LINOS_DEPLOYMENT_ENV}.yaml \
        --version ${CHART_VERSION} \
        --namespace ${LINOS_DEPLOYMENT_ENV} \
        --set env=${LINOS_DEPLOYMENT_ENV} \
        --set date="$(date +'%s')" \
        --set app.image="${LINOS_HOST_IMAGE_NAME}:${BITBUCKET_COMMIT}"

    echo "services deployed"
}

# DESC: Main control flow
# ARGS: $@ (optional): Arguments provided to the script
# OUTS: None
function main() {
    # shellcheck source=source.sh
    source "$(dirname "${BASH_SOURCE[0]}")/functions.sh"

    # trap script_trap_err ERR
    # trap script_trap_exit EXIT

    script_init "$@"
    parse_params "$@"
    cron_init
    colour_init
    #lock_init system
    import_env_vars

    begin


    if [[ "$LINOS_CLUSTER_ENV" == "AWS" ]]; then
        # configure kubectl to connect to aws cluster

        aws configure set region us-west-2
        aws configure set output json
        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY

        aws eks --region us-west-2 update-kubeconfig --name linos_dev_eks
    fi

    deploy

    end
}

# Make it rain
main "$@"
