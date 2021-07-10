#!/bin/bash

# install development tools

# A better class of script...
set -o errexit  # Exit on most errors (see the manual)
set -o errtrace # Make sure any error trap is inherited
set -o nounset  # Disallow expansion of unset variables
set -o pipefail # Use last non-zero exit code in a pipeline
#set -o xtrace          # Trace the execution of the script (debug)


# DESC: install shellcheck bash script analyzer
# ARGS: None
# OUTS: None
function install_shellcheck(){
    echo "installing shellcheck"
    # install shellcheck
    #https://github.com/koalaman/shellcheck#installing
}

# DESC: install global npm packages
# ARGS: None
# OUTS: None
function install_npm_packages(){
    echo "installing npm packages"
    # Install packages listed in local package.json
    npm i
}



# DESC: pre-install tasks, cleanup of installed dependencies.
# ARGS: None
# OUTS: None
function pre_install() {
    rm -rf ./.install && rm -rf ./.bin
    rm -rf node_modules/
    mkdir -p ./.install
    mkdir -p ./.bin
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
    npm config set '_auth' "${NPM_TOKEN}"
    pre_install
    install_npm_packages

    end
}

# Make it rain
main "$@"

# vim: syntax=sh cc=80 tw=79 ts=4 sw=4 sts=4 et sr
