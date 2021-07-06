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
    
    npm login --registry=https://lineage.jfrog.io/lineage/api/npm/linos-npm --scope=@linos

    end
}

# Make it rain
main "$@"