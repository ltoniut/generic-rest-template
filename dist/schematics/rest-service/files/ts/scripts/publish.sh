#!/usr/bin/env bash

# publish script

# A better class of script...
set -o errexit  # Exit on most errors (see the manual)
set -o errtrace # Make sure any error trap is inherited
set -o nounset  # Disallow expansion of unset variables
set -o pipefail # Use last non-zero exit code in a pipeline
#set -o xtrace          # Trace the execution of the script (debug)


# DESC: publish docker image
# ARGS: None
# OUTS: None
function publish_docker_image(){
    echo "publishing docker image"

     # login to the container repository
    echo "${HOST_REPOSITORY_SECRET}" | docker login "${DOCKER_REGISTRY}" --username "${HOST_REPOSITORY_USERNAME}" --password-stdin

    # commit changes to container (update)
    docker push "${HOST_IMAGE_NAME}"

    # logout of the container repository
    # shellcheck disable=SC2086
    docker logout ${DOCKER_REGISTRY}
}

# DESC: publish helm chart
# ARGS: None
# OUTS: None
function publish_helm_chart(){
    echo "publishing helm chart"
    helm plugin install https://github.com/belitre/helm-push-artifactory-plugin
}



# DESC: Main control flow
# ARGS: $@ (optional): Arguments provided to the script
# OUTS: None
function main() {
    # shellcheck source=source.sh
    source "$(dirname "${BASH_SOURCE[0]}")/functions.sh"

    trap script_trap_err ERR
    trap script_trap_exit EXIT

    script_init "$@"
    parse_params "$@"
    cron_init
    colour_init
    import_env_vars

    begin

    publish_docker_image
    # publish_helm_chart

    end
}

# Make it rain
main "$@"

# vim: syntax=sh cc=80 tw=79 ts=4 sw=4 sts=4 et sr
