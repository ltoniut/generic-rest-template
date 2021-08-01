import schemas from 'rest-commons/dist/schemas/model-builders';
import * as jsonPath from 'jsonpath';

/**
 * Helper class to grab information from entities.
 */
export class EntityHelper {
  private DOMAIN_ENTITY_PATH = 'rest-commons/dist/typeorm/domain-entities/';
  private ENTITY_PATH = 'rest-commons/dist/typeorm/entities/';

  constructor(private entityName: string) {}

  public isDomainEntity(): boolean {
    return this.moduleExists(`${this.DOMAIN_ENTITY_PATH}${this.entityName}DO`);
  }

  public isEntity(): boolean {
    return this.moduleExists(`${this.ENTITY_PATH}${this.entityName}`);
  }

  public isPresent() {
    return this.isDomainEntity() || this.isEntity();
  }

  public getPath(): string {
    if (this.isDomainEntity()) {
      return `${this.DOMAIN_ENTITY_PATH}${this.entityName}DO`;
    }
    if (this.isEntity()) {
      return `${this.ENTITY_PATH}${this.entityName}`;
    }
    throw new Error(`Unable to get path for entity: ${this.entityName}`)
  } 

  public getEntityName(): string {
    if (this.isDomainEntity()) {
      return `${this.entityName}DO`;
    }
    if (this.isEntity()) {
      return this.entityName;
    }
    throw new Error(`Unable to get entity name for entity: ${this.entityName}`)
  }

  public getIndexes(): string[] {
    const fields = schemas.filter(entity => entity.name === this.entityName)
         .map(entity => entity['indexes'])
         .filter(indexes => indexes !== undefined && indexes !== null)
         .filter(indexes => indexes[Object.keys(indexes)[0]] !== undefined)
         .map(indexes => indexes[Object.keys(indexes)[0]]['columns'].filter(value => value !== 'id'));
  
    return [].concat(...fields)
  }

  public getRelations(): string {
    const entity = schemas.find(entity => entity.name === this.entityName) || {};
    const fields = jsonPath.query(entity, "$.fields[?(@.fieldType=='relation')].fieldName");
    const jsonObject =  fields.reduce((ac, a) => ({...ac,[a]: true}), {});
    const jsonString = JSON.stringify(jsonObject, null, 2);
    return jsonString.replace(/"([^"]+)":/g, '$1:');
  }

  private moduleExists(path: string): boolean {
    try {
      require.resolve(path);
      return true;
    } catch(e) {
      return false;
    }  
  }
}