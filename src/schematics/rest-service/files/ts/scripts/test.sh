#!/usr/bin/env bash

# test script

# A better class of script...
set -o errexit  # Exit on most errors (see the manual)
set -o errtrace # Make sure any error trap is inherited
set -o nounset  # Disallow expansion of unset variables
set -o pipefail # Use last non-zero exit code in a pipeline
#set -o xtrace          # Trace the execution of the script (debug)

# DESC: Test control flow
# ARGS: $@ (optional): Arguments provided to the script
# OUTS: None
run_tests() {

    # test scripts
    # declare test_files="tests/*"
    # for file in $test_files; do
        # # iterate through version-option files
        # echo $file
        # ./.bin/bats/bin/bats --tap "${file}"
    # done

    # run jest tests
    npm run test

    #[[ "${test_files[@]}" ]] && bats "${test_files[@]}"
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
    #lock_init system
    import_env_vars

    begin
    run_tests
    end
}

# Make it rain
main "$@"

# vim: syntax=sh cc=80 tw=79 ts=4 sw=4 sts=4 et sr
