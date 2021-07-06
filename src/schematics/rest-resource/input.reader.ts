import * as fs from 'fs';

/**
 * Interface representing the entity record format.
 * Right now we are just using the entity name, but we may 
 * want to add some extra data in the future in order to customize
 * the generated code.
 */
interface Entity {
    name: string;
}

/**
 * Reads the input file, parse it and return a list of @type {Entity} objects.
 */
export class FileReader {

       private _entities: Entity[];

       constructor(fileName: string) {
              let rawData = fs.readFileSync(fileName, 'utf8');
              this._entities = JSON.parse(rawData).entities;
              if (!this._entities) {
                     throw new Error(`Entities not found in ${fileName}`);
              }
       }

       get entities(): Entity[] {
              return this._entities;
       }
}