"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = require("../defaults");
exports.default = {
    '$schema': 'http://json-schema.org/schema',
    'id': 'SchematicsNestApplication',
    'title': 'Nest Application Options Schema',
    'questions': [
        {
            type: 'input',
            name: 'name',
            message: 'Rest Service Name?',
            validate: (value) => {
                return !!value.trim() || 'Please enter a name for the project';
            }
        },
        {
            type: 'input',
            name: 'author',
            message: 'Who is the author of the project?',
            default: 'Leandro'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Which is the description of the project?',
        },
        {
            type: 'input',
            name: 'version',
            message: 'Which is the version of the project?',
            default: '0.0.1'
        },
        {
            type: 'number',
            name: 'port',
            message: 'In which port will it run?',
            default: 3000
        },
        {
            type: 'confirm',
            name: 'persistence',
            message: 'Do you want to override default database configuration?',
            default: false
        },
        {
            type: 'input',
            name: 'rdsHostName',
            message: 'Enter RDS Hostname?',
            validate: (value) => {
                return !!value.trim() || 'Please enter RDS Hostname';
            },
            when: (answers) => {
                return answers.persistence;
            },
            default: defaults_1.RDS_HOST_NAME
        },
        {
            type: 'input',
            name: 'rdsUsername',
            message: 'Enter RDS Username?',
            validate: (value) => {
                return !!value.trim() || 'Please enter RDS Username';
            },
        },
        {
            type: 'password',
            name: 'rdsPassword',
            message: 'Enter RDS Password?',
            validate: (value) => {
                return !!value.trim() || 'Please enter RDS Password';
            },
        },
        {
            type: 'input',
            name: 'rdsDbName',
            message: 'Enter RDS Database Name?',
            validate: (value) => {
                return !!value.trim() || 'Please enter RDS Database Name';
            },
            when: (answers) => {
                return answers.persistence;
            },
            default: defaults_1.RDS_DATABASE_NAME,
        },
        {
            type: 'number',
            name: 'rdsDbPort',
            message: 'Enter RDS Port?',
            when: (answers) => {
                return answers.persistence;
            },
            default: defaults_1.RDS_DATABASE_PORT,
        },
    ]
};
