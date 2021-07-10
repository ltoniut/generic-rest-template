#!/usr/bin/env bash

# startup script

# A better class of script...
set -o errexit  # Exit on most errors (see the manual)
set -o errtrace # Make sure any error trap is inherited
set -o nounset  # Disallow expansion of unset variables
set -o pipefail # Use last non-zero exit code in a pipeline
#set -o xtrace          # Trace the execution of the script (debug)

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
    #lock_init system
    import_env_vars

    begin
    # stop any running containers that have this name
    if [ "$(docker ps -a -q -f name="${HOST_CONTAINER_NAME}")" ]; then
        docker rm "${HOST_CONTAINER_NAME}"
    fi
    # run the container
    # docker run -p "${PLATFORM_COMPONENT_EXTERNAL_PORT}":"${PLATFORM_COMPONENT_EXTERNAL_PORT}" -d --name="${HOST_CONTAINER_NAME}" "${HOST_IMAGE_NAME}"
    docker-compose down -v
    docker-compose build --no-cache
    docker-compose up
    # done
    end
}

# Make it rain
main "$@"

# vim: syntax=sh cc=80 tw=79 ts=4 sw=4 sts=4 et sr
