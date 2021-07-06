"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const Observable_1 = require("@angular-devkit/core/node_modules/rxjs/internal/Observable");
const inquirer_1 = require("inquirer");
const path_1 = require("path");
const defaults_1 = require("../defaults");
const schema_1 = require("./schema");
function main(options) {
    return (host, ctx) => {
        const observer = new Observable_1.Observable((observer) => {
            let path;
            inquirer_1.prompt(schema_1.default.questions).then((answers) => {
                options = Object.assign({}, answers);
                options.name = core_1.strings.dasherize(options.name);
                path =
                    !options.directory || options.directory === 'undefined'
                        ? options.name
                        : options.directory;
                options = transform(options);
                return generate(options, path, ctx).toPromise();
            }).then((tree) => {
                observer.next(tree);
                observer.complete();
            }).catch(err => {
                console.error("ERROR BUILDING THE TREE", err);
                observer.error(err);
            });
        });
        return observer;
    };
}
exports.main = main;
function transform(options) {
    const target = Object.assign({}, options);
    target.author = !!target.author ? target.author : defaults_1.DEFAULT_AUTHOR;
    target.description = !!target.description
        ? target.description
        : defaults_1.DEFAULT_DESCRIPTION;
    target.language = 'ts';
    target.name = resolvePackageName(target.name);
    target.version = !!target.version ? target.version : defaults_1.DEFAULT_VERSION;
    target.rdsDbName = defaults_1.RDS_DATABASE_NAME;
    target.rdsDbPort = defaults_1.RDS_DATABASE_PORT;
    target.rdsHostName = defaults_1.RDS_HOST_NAME;
    return target;
}
function resolvePackageName(path) {
    const { name } = path_1.parse(path);
    if (name === '.') {
        return path_1.basename(process.cwd());
    }
    return name;
}
function generate(options, path, ctx) {
    return schematics_1.apply(schematics_1.url(core_1.join('./files', options.language)), [
        schematics_1.template(Object.assign(Object.assign({}, core_1.strings), options)),
        schematics_1.move(path),
    ])(ctx);
}
