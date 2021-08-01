# Generic Rest Template

- [NestJS](https://docs.nestjs.com/)
- [GraphQL](https://graphql.org/)

### Prerrequisitos de la instalación

Ciertos componentes son prerrequisitos para poder desarrollar sobre éste proyecto

- [git](https://git-scm.com/downloads)
- [vscode](https://code.visualstudio.com/download)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (Node v 12.14.1^)

### Ejecutar la aplicación y verificar funcionamiento

Para empezar, diríjase al directorio base e instale los paquetes mediante el comando "npm install" o, si se tiene yarn instalado, "yarn install".

Asumiendo una instalación correcta, se debería poder inicializar el proyecto usando el comando "npm start". Para probarlo, se puede acceder a la url:

http://localhost:3000/

Deberías ver el mensaje:
```Api is Live```

## Estructura del proyecto

```
    ./Makefile          -Archivo de automatización.
    ./config            -Archivos de configuración
    ./src               -Donde se aloja el código
    ./scripts           -Funciones con opciones para correr el programa
    ./tests             -Código dedicados al testeo
```


## Scripts

```
    Los scripts pueden ser llamados con el archivo Make

    ./scripts/functions.sh      -Funciones de bash compartidas.
    ./scripts/install.sh        -Instalación de dependencias y herramientas de desarrollo

    ./scripts/analyze.sh        -Script de análisis del proyecto
    ./scripts/build.sh          -Script de construcción del proyecto
    ./scripts/test.sh           -Script de testeo del proyecto
    ./scripts/deploy.sh         -Script de desarrollo del proyecto
    ./scripts/publish.sh        -Script de publicación del proyecto

    ./scripts/start.sh          -Script de startup del proyecto
    ./scripts/stop.sh           -Script de detención del proyecto

```

### Funciones de GET en commons

En el repositorio de cada módulo, el constructor tiene dos parámetros que toman arreglos de strings. El primero toma "variables de ordenamiento" y el segundo "variables de filtro", en los cuales se pueden agregar nombres de las variables de la entidad relevante. Usando en las llamadas GET los parámetros filter u order, respectivamente, se puede filtrar por elementos que, para la variable indicada, contengan total o parcialmente el parámetro indicado, u ordenar los elementos en función a la variable o variables indicadas.

### Sobreescribir funciones

Si las funciones básicas que provee el proyecto commons no satisfacieran los requerimientos del sistema, se pueden sobreescribir las funciones en los servicios y repositorios, o incluso introducir nuevas funcionalidades para los controladores. Éste sistema de creación de proyectos está supuesto a ser una herramienta de desarrollo y no una respuesta universal a la programación de sistemas REST.

### Documentación de NestJS

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [Documentación de TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)

### Links de VSCode

- [Contenedor remoto de VSCode](https://code.visualstudio.com/docs/remote/containers)

### Links de NodeJS

- [Best Practices de NestJS](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)