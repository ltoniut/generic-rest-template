import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  Source,
  template,
  url,
  Tree,
  branchAndMerge,
} from '@angular-devkit/schematics';
import { classify } from '@angular-devkit/core/src/utils/strings';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ResourceOptions } from './resource.schema';
import * as pluralize from 'pluralize';
import { ModuleFinder, ModuleDeclarator, DeclarationOptions } from '../..';
import { prompt } from 'inquirer';
import schema from './schema';
import { FileReader } from './input.reader';
import { EntityHelper } from './entity.helper';

enum InputType {
  FILE = 1,
  ENTITY_NAME = 2
}

export function main(resourceOptions: ResourceOptions): Rule {
  return async (host: Tree, ctx: SchematicContext) => {
      const answers = await prompt(schema.questions);
      const options = {
        ...resourceOptions,
        ...answers,
        language: 'ts',
        metadata: 'imports'
      };
      
      /**
       * Verifies that the module for the given entity exists and peform the Rule creation.
       * @param entityName The entity name
       */
      let verifyAndCreate = (entityName: string): Rule | undefined => {
        const entityHelper = new EntityHelper(entityName);
        if (!entityHelper.isPresent()) {
          console.log(`Unable to find module: ${entityName}`);
          return undefined;
        }
        return createEntityRule(options, entityName)
      }

      switch(options.inputType) {
        case InputType.FILE:
          const rules = new FileReader(options.name)
              .entities
              .map(entity => verifyAndCreate(entity.name))
              .filter(Boolean)
              .map(rule => rule);
          return chain(rules);
        case InputType.ENTITY_NAME:
          return verifyAndCreate(options.name);
        default:
          throw new Error(`Invalid input type: ${options.inputType}`);
      }
  }
}

function createEntityRule(options: ResourceOptions, entityName: string): Rule {
   return (tree: Tree, context: SchematicContext) => {
    options.name = strings.dasherize(entityName);
    options.path = join('modules' as Path, options.usePrefix ? `${options.prefix}/${options.name}`: options.name);
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ])
    )(tree, context);
  };
}

function generate(options: ResourceOptions): Source {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path, options.language)), [
      options.spec ? noop() : filter((path) => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
        EntityHelper,
        lowercased: (name: string) => {
          const classifiedName = classify(name);
          return (
            classifiedName.charAt(0).toLowerCase() + classifiedName.slice(1)
          );
        },
        singular: (name: string) => pluralize.singular(name),
        ent: (name: string) => name + '.entity',
      }),
      move(options.path),
      move(options.path + '/tests', options.path + '/__tests__'),
    ])(context);
}

function addDeclarationToModule(options: ResourceOptions): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, {
        ...options,
        type: 'module',
      } as DeclarationOptions),
    );
    return tree;
  };
}
