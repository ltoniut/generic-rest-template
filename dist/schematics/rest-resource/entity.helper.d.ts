export declare class EntityHelper {
    private entityName;
    private DOMAIN_ENTITY_PATH;
    private ENTITY_PATH;
    constructor(entityName: string);
    isDomainEntity(): boolean;
    isEntity(): boolean;
    isPresent(): boolean;
    getPath(): string;
    getEntityName(): string;
    getIndexes(): string[];
    getRelations(): string;
    private moduleExists;
}
