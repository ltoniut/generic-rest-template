# What is this project?

This project is a schematic for generating NestJS projects.


## Usage

For using this as a collection for NestJS CLI you have to install this packages globally first:

```bash
npm i -g https://bitbucket.org/lineagenext/generic-rest-api-template.git
```

Then you can refer to the package from the nest CLI with:

```bash
# For generating an app
nest g -c ./generic-rest-api-template rest-service
```

```bash
# For generating crud modules for a single or a list of entities
nest g -c ../generic-rest-api-template rest-resource
```

### Generating an app

If you generate an app, the available parameters are (will be asqued at runtime):

| Name                | Type    | Optional | Default                                 | Description                                                                                                                 |
|---------------------|---------|----------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| name                | string  | No       | -                                       | The Rest Service name. Used in the code and in the folder name                                                             |
| author              | string  | Yes      | Local User                               | The project author. Appears in package.json                                                                                 |
| description         | string  | Yes      | -                                       | The project description. Appears in package.json                                                                            |
| version             | string  | Yes      | 0.0.1                                   | The project version. Appears in package.json                                                                                |
| port                | number  | No       | 3000                                    | The application port         |
| persistence         | boolean | No       | true                                    | Whether the app is going to override the default persistence settings |
| rdsHostName         | string  | Yes      | Rds hostname in defaults.ts             | The RDS Hostname                                                                                                            |
| rdsUsername         | string  | No       | _                                       | The RDS username                                                                                                            |
| rdsPassword         | string  | No       | _                                       | The RDS password                                                                                                            |
| rdsDbName           | string  | Yes      | CONNECT_55                              | The RDS database name                                                                                                       |
| rdsPort             | number  | Yes      | 1433                                    | The RDS port number                                                                                                         |

