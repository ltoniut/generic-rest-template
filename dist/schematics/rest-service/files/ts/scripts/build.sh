#!/usr/bin/env bash

# build script

# A better class of script...
set -o errexit  # Exit on most errors (see the manual)
set -o errtrace # Make sure any error trap is inherited
set -o nounset  # Disallow expansion of unset variables
set -o pipefail # Use last non-zero exit code in a pipeline
#set -o xtrace          # Trace the execution of the script (debug)

function prebuild() {
    echo "removing dist directory..."
    rm -rf dist/
}

# DESC: Main control flow
# ARGS: $@ (optional): Arguments provided to the script
# OUTS: None
function main() {
    source "$(dirname "${BASH_SOURCE[0]}")/functions.sh"

    trap script_trap_err ERR
    trap script_trap_exit EXIT

    script_init "$@"
    parse_params "$@"
    cron_init
    colour_init
    #lock_init system
    import_env_vars

    prebuild
    begin
        pretty_print "building image ${HOST_IMAGE_NAME}:${BITBUCKET_COMMIT}"
        docker build . -t "${HOST_IMAGE_NAME}:${BITBUCKET_COMMIT}" -f ./Dockerfile --build-arg NPM_TOKEN=$NPM_TOKEN
    end
}

# Make it rain
main "$@"

# vim: syntax=sh cc=80 tw=79 ts=4 sw=4 sts=4 et sr
