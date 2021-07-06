"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const source_root_helpers_1 = require("../../utils/source-root.helpers");
const pluralize = require("pluralize");
const __1 = require("../..");
const inquirer_1 = require("inquirer");
const schema_1 = require("./schema");
const input_reader_1 = require("./input.reader");
const entity_helper_1 = require("./entity.helper");
var InputType;
(function (InputType) {
    InputType[InputType["FILE"] = 1] = "FILE";
    InputType[InputType["ENTITY_NAME"] = 2] = "ENTITY_NAME";
})(InputType || (InputType = {}));
function main(resourceOptions) {
    return async (host, ctx) => {
        const answers = await inquirer_1.prompt(schema_1.default.questions);
        const options = Object.assign(Object.assign(Object.assign({}, resourceOptions), answers), { language: 'ts', metadata: 'imports' });
        let verifyAndCreate = (entityName) => {
            const entityHelper = new entity_helper_1.EntityHelper(entityName);
            if (!entityHelper.isPresent()) {
                console.log(`Unable to find module: ${entityName}`);
                return undefined;
            }
            return createEntityRule(options, entityName);
        };
        switch (options.inputType) {
            case InputType.FILE:
                const rules = new input_reader_1.FileReader(options.name)
                    .entities
                    .map(entity => verifyAndCreate(entity.name))
                    .filter(Boolean)
                    .map(rule => rule);
                return schematics_1.chain(rules);
            case InputType.ENTITY_NAME:
                return verifyAndCreate(options.name);
            default:
                throw new Error(`Invalid input type: ${options.inputType}`);
        }
    };
}
exports.main = main;
function createEntityRule(options, entityName) {
    return (tree, context) => {
        options.name = core_1.strings.dasherize(entityName);
        options.path = core_1.join('modules', options.usePrefix ? `${options.prefix}/${options.name}` : options.name);
        return schematics_1.branchAndMerge(schematics_1.chain([
            source_root_helpers_1.mergeSourceRoot(options),
            addDeclarationToModule(options),
            schematics_1.mergeWith(generate(options)),
        ]))(tree, context);
    };
}
function generate(options) {
    return (context) => schematics_1.apply(schematics_1.url(core_1.join('./files', options.language)), [
        options.spec ? schematics_1.noop() : schematics_1.filter((path) => !path.endsWith('.spec.ts')),
        schematics_1.template(Object.assign(Object.assign(Object.assign({}, core_1.strings), options), { EntityHelper: entity_helper_1.EntityHelper, lowercased: (name) => {
                const classifiedName = strings_1.classify(name);
                return (classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1));
            }, singular: (name) => pluralize.singular(name), ent: (name) => name + '.entity' })),
        schematics_1.move(options.path),
        schematics_1.move(options.path + '/tests', options.path + '/__tests__'),
    ])(context);
}
function addDeclarationToModule(options) {
    return (tree) => {
        if (options.skipImport !== undefined && options.skipImport) {
            return tree;
        }
        options.module = new __1.ModuleFinder(tree).find({
            name: options.name,
            path: options.path,
        });
        if (!options.module) {
            return tree;
        }
        const content = tree.read(options.module).toString();
        const declarator = new __1.ModuleDeclarator();
        tree.overwrite(options.module, declarator.declare(content, Object.assign(Object.assign({}, options), { type: 'module' })));
        return tree;
    };
}
