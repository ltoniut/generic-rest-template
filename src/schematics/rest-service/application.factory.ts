import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  move,
  Rule,
  template,
  url,
  Tree,
  SchematicContext,
} from '@angular-devkit/schematics';
import { Observable } from '@angular-devkit/core/node_modules/rxjs/internal/Observable'
import { prompt } from 'inquirer';
import { basename, parse } from 'path';
import {
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_VERSION,
  RDS_DATABASE_NAME,
  RDS_DATABASE_PORT,
  RDS_HOST_NAME,
} from '../defaults';
import { ApplicationOptions } from './application.schema';
import schema from './schema';

export function main(options: ApplicationOptions): Rule {
  return (host: Tree, ctx: SchematicContext) => {
    const observer = new Observable<Tree>((observer) => {
      let path;

      prompt(schema.questions).then((answers) => {
        options = { ...answers };
        options.name = strings.dasherize(options.name);
  
        path =
          !options.directory || options.directory === 'undefined'
            ? options.name
            : options.directory;
    
        options = transform(options);
        
        return generate(options, path, ctx).toPromise<Tree>();
      }).then((tree: Tree) => {

        observer.next(tree);

        observer.complete();
      }).catch(err => {
        console.error("ERROR BUILDING THE TREE", err);
        observer.error(err);
      })
    });
  
    return observer;
  }
}

function transform(options: ApplicationOptions): ApplicationOptions {
  const target: ApplicationOptions = Object.assign({}, options);

  target.author = !!target.author ? target.author : DEFAULT_AUTHOR;
  target.description = !!target.description
    ? target.description
    : DEFAULT_DESCRIPTION;
  target.language = 'ts';
  target.name = resolvePackageName(target.name);
  target.version = !!target.version ? target.version : DEFAULT_VERSION;
  target.rdsDbName = RDS_DATABASE_NAME;
  target.rdsDbPort = RDS_DATABASE_PORT;
  target.rdsHostName = RDS_HOST_NAME;

  return target;
}

function resolvePackageName(path: string) {
  const { name } = parse(path);
  if (name === '.') {
    return basename(process.cwd());
  }
  return name;
}

function generate(options: ApplicationOptions, path: string, ctx: SchematicContext): Observable<Tree> {
  return apply(url(join('./files' as Path, options.language)), [
    template({
      ...strings,
      ...options,
    }),
    move(path),
  ])(ctx) as Observable<Tree>;
}
