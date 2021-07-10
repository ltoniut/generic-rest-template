![lin](logo.png)

### Stack

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
```API is Live```

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

### Configuraciones de búsqueda

En el constructor de repositorios de cada módulo hay dos arrays que, por defecto, están vacíos. Si se quisieran habilitar opciones de filtro o de ordenamiento de datos en los GET, se deben llenar los arrays con los nombres de las variables relevantes, en forma de strings. El primer arreglo maneja las variables de ordenamiento, y el segundo las de filtro, y pueden ser invocadas usando sortBy o filterBy, respectivamente, en los parámetros de búsqueda de una llamada GET.

### Documentación de NestJS

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS GraphQL Documentation](https://docs.nestjs.com/graphql/quick-start)
- [NestJS TypeORM Documentation](https://docs.nestjs.com/recipes/sql-typeorm)
- [NestJS CQRS Documentation](https://docs.nestjs.com/recipes/cqrs)

### Links de VSCode

- [VS Code and Docker](https://code.visualstudio.com/docs/azure/docker)
- [Become a Docker poweruser in VS Code](https://brianchristner.io/docker-and-microsoft-vs-code/)
- [VS Code Remote Container](https://code.visualstudio.com/docs/remote/containers)

### Links de NodeJS

- [NodeJS Container Image Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)