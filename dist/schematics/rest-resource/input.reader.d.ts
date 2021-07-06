interface Entity {
    name: string;
}
export declare class FileReader {
    private _entities;
    constructor(fileName: string);
    get entities(): Entity[];
}
export {};
