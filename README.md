# Objetivo del proyecto

Éste proyecto es un schema para generar proyectos de NestJS

## Uso

Para utilizar éste proyecto, luego de clonarlo, se debe en principio realizar la instalación en el directorio base, ejecutando el comando "npm install" o, si se tiene yarn instalado, "yarn install". También se necesitará instalar nestjs globalmente con el comando

```
npm install -g nestjs
```

### Crear una aplicación

Para la creación del servicio, primero se deberá ejecutar el comando:

```
nest g -c @directorio/generic-rest-template rest-service
```

Al hacerlo, el desarrollador deberá responder una serie de preguntas acerca del proyecto que se generará:

| Name                | Type    | Optional | Default                                 | Description                                                                                                                 |
|---------------------|---------|----------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| name                | string  | No       | -                                    | El nombre del servicio REST. Figura en package.json                      |
| author              | string  | Yes      | Local User                           | El autor del proyecto. Figura en package.json       |
| description         | string  | Yes      | -                                    | Descriptión del proyecto. Figura en package.json          |
| version             | string  | Yes      | 0.0.1                                | La versión del proyecto. Figura en package.json             |
| port                | number  | No       | 3000                                 | El puerto de la aplicación         |
| persistence         | boolean | No       | true                                 | Si la aplicación hará un override de los settings de persistencia default |
| rdsHostName         | string  | Yes      | Hostname en defaults.ts              | Host de la base de datos                    |
| rdsUsername         | string  | No       | _                                    | Nombre de usuario de la base de datos           |
| rdsPassword         | string  | No       | _                                    | Contraseña de la base de datos            |
| rdsDbName           | string  | Yes      | _                                    | Nombre de la base de datos         |
| rdsPort             | number  | Yes      | _                                    | Puerto de la base de datos                  |

## Crear una lista de entidades

Sobre una aplicación ya creada, ejecutar el siguiente comando, referiendo a la ubicación de generic-rest-template

```
nest g -c @directorio/generic-rest-template rest-resource
```

Al hacerlo, se dará la opción entre crearlo para un único nombre de entidad, o un archivo .json