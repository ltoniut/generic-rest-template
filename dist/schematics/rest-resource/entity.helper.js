"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityHelper = void 0;
const model_builders_1 = require("rest-commons/dist/schemas/model-builders");
const jsonPath = require("jsonpath");
class EntityHelper {
    constructor(entityName) {
        this.entityName = entityName;
        this.DOMAIN_ENTITY_PATH = 'rest-commons/dist/typeorm/domain-entities/';
        this.ENTITY_PATH = 'rest-commons/dist/typeorm/entities/';
    }
    isDomainEntity() {
        return this.moduleExists(`${this.DOMAIN_ENTITY_PATH}${this.entityName}DO`);
    }
    isEntity() {
        return this.moduleExists(`${this.ENTITY_PATH}${this.entityName}`);
    }
    isPresent() {
        return this.isDomainEntity() || this.isEntity();
    }
    getPath() {
        if (this.isDomainEntity()) {
            return `${this.DOMAIN_ENTITY_PATH}${this.entityName}DO`;
        }
        if (this.isEntity()) {
            return `${this.ENTITY_PATH}${this.entityName}`;
        }
        throw new Error(`Unable to get path for entity: ${this.entityName}`);
    }
    getEntityName() {
        if (this.isDomainEntity()) {
            return `${this.entityName}DO`;
        }
        if (this.isEntity()) {
            return this.entityName;
        }
        throw new Error(`Unable to get entity name for entity: ${this.entityName}`);
    }
    getIndexes() {
        const fields = model_builders_1.default.filter(entity => entity.name === this.entityName)
            .map(entity => entity['indexes'])
            .filter(indexes => indexes !== undefined && indexes !== null)
            .filter(indexes => indexes[Object.keys(indexes)[0]] !== undefined)
            .map(indexes => indexes[Object.keys(indexes)[0]]['columns'].filter(value => value !== 'id'));
        return [].concat(...fields);
    }
    getRelations() {
        const entity = model_builders_1.default.find(entity => entity.name === this.entityName) || {};
        const fields = jsonPath.query(entity, "$.fields[?(@.fieldType=='relation')].fieldName");
        const jsonObject = fields.reduce((ac, a) => (Object.assign(Object.assign({}, ac), { [a]: true })), {});
        const jsonString = JSON.stringify(jsonObject, null, 2);
        return jsonString.replace(/"([^"]+)":/g, '$1:');
    }
    moduleExists(path) {
        try {
            require.resolve(path);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.EntityHelper = EntityHelper;
