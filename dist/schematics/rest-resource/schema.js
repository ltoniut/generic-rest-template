"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.default = {
    '$schema': 'http://json-schema.org/schema',
    'id': 'SchematicsNestResource',
    'title': 'Nest Resource Options Schema',
    'questions': [
        {
            type: 'confirm',
            name: 'usePrefix',
            message: 'Do you want to add a prefix for the modules ?',
            default: true
        },
        {
            type: 'input',
            name: 'prefix',
            message: 'Enter the prefix name',
            when: (answers) => {
                return answers.usePrefix === true;
            },
            default: 'admin'
        },
        {
            type: 'list',
            name: 'inputType',
            message: 'Select input type?',
            choices: [
                {
                    "name": "File with list of Entities",
                    "value": 1
                },
                {
                    "name": "Entity Name",
                    "value": 2
                }
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter path to the file with a list of entities',
            when: (answers) => {
                return answers.inputType === 1;
            },
            validate: (value) => {
                if (!!value.trim()) {
                    return fs.existsSync(value) || 'File not found';
                }
                else {
                    return 'Please enter a valid file path';
                }
            }
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter entity name',
            when: (answers) => {
                return answers.inputType === 2;
            },
            validate: (value) => {
                return !!value.trim() || 'Please enter an Entity name';
            }
        },
    ]
};
