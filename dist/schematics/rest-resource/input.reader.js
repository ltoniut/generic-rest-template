"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReader = void 0;
const fs = require("fs");
class FileReader {
    constructor(fileName) {
        let rawData = fs.readFileSync(fileName, 'utf8');
        this._entities = JSON.parse(rawData).entities;
        if (!this._entities) {
            throw new Error(`Entities not found in ${fileName}`);
        }
    }
    get entities() {
        return this._entities;
    }
}
exports.FileReader = FileReader;
