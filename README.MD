#   Servidor - Hagámoslo
>  Este es un servidor del proyecto **Hagámoslo** el cual fue presentado para la materia de Aplicaciones Móviles en el Instituto Tecnológico de Teziutlán.

Link del cliente [![GitHub](https://img.shields.io/github/stars/martinGM05/Hagamoslo-Cliente.svg?style=social)](https://github.com/martinGM05/Hagamoslo-Cliente)

El servidor fue desarrollado con ayuda de algunas librerías de terceros, como:

Si desea descargar el código no se olvide de ejecutar el comando:

    npm install

## Librerías

| Librería     | Descripción  |
| -----------  | ----------- |
| cors      |   Permite que el servidor pueda recibir peticiones de otros dominios |
| express   |   Express es un framework de Node.js que facilita el desarrollo de aplicaciones web. |
| jest      |   Jest es un framework de JavaScript para el desarrollo de pruebas unitarias. |
| tslint    |   TSLint es una herramienta de linting para JavaScript. |
| typescript|   Typescript es un lenguaje de programación orientado a objetos. |
| Prisma CLI - ORM | Prisma es un ORM para Node.js. |
| bcryptjs  |   bcryptjs es una librería de Node.js para encriptar contraseñas. |
| express-fileupload | Es un middleware para el marco Express que le brinda una manera fácil de manejar la carga de archivos usando el marco Express. |
| dotenv |   Dotenv es una librería para leer archivos de configuración de entorno. |

## Pruebas Unitarias

Se han realizado pruebas unitarias con **JEST** solamente en la carpeta Sevice debido a que es la única que contiene la lógica del proyecto.
Para poder corrrer las pruebas basta con ejecutra el comando:

    npm run test

## CI/CD
Es una herramienta que nos permite automatizar el proceso de desarrollo de nuestros proyectos.
Se utilizó [GitHub Actions](https://docs.github.com/en/actions) para automatizar el proceso de desarrollo.

Cada vez que se haga un commit a la rama master y pase las pruebas unitarias procederá a construir el proyecto y desplegarlo en el servidor de Azure.

![GithubActions](https://docs.microsoft.com/es-mx/azure/architecture/solution-ideas/media/devsecops-in-github-data-flow.png)

## Lógica del Servidor
```mermaid
graph TD;
    Database --> Prisma;
    Prisma --> BlogsService;
    Prisma --> ComentarioBlogService;
    Prisma --> Hired;
    Prisma --> RoleService;
    Prisma --> SalaService;
    Prisma --> TagService;
    Prisma --> UserService;
    Prisma --> WorkerService;
    BlogsService --> BlogController;
    ComentarioBlogService --> ComentarioBlogController;
    Hired --> HiredController;
    SalaService --> SalaController;
    TagService --> TagController;
    generate-jwt --> UserService;
    validate-jwt --> UserService;
    validateFile --> UserService;
    upload-image --> UserService; 
    UserService --> UsuariosController;
    WorkerService --> WorkerController;
    BlogController --> Route;
    ComentarioBlogController --> Route;
    HiredController --> Route;
    SalaController --> Route;
    TagController --> Route;
    UsuariosController --> Route;
    WorkerController --> Route;
    Route --> Server;
```

## Endpoints
| Metodo | Endpoint | Descripción |
| -----------  | ----------- | ----------- |
| GET | /usuarios | Obtiene todos los usuarios |
| GET | /usuarios/:idUsuario  | Obtiene un usuario por su id |
| PUT | /usuarios/:idUsuario  | Actualiza un usuario por su id |
| POST | /usuarios | Crea un usuario |
| GET | /auth | Autentica un usuario |
| GET | /workers | Obtiene todos los trabajadores |
| GET | /workers/:idWorker  | Obtiene un trabajador por su id |
| PUT | /workers/:idWorker  | Actualiza un trabajador por su id |
| GET | /service | Obtiene todos los servicios |
| GET | /service/:idService  | Obtiene un servicio por su id |
| POST | /service | Crea un servicio |
| GET | /hired/:idUsuario/true | Obtiene todos los servicios en curso del cliente |
| GET | /hired/:idUsuario/false | Obtiene todos los servicios en historial del cliente |
| PUT | /hired/:idService | Actualiza el estado de un servicio |
| GET | /hired/:idWorker/true | Obtiene todos los servicios en curso del trabajador |
| GET | /hired/worker/:idWorker/false | Obtiene todos los servicios en historial del trabajador |
| POST | /hired | Crea un servicio |
| GET | /salas/:idSala | Obtiene las salas del cliente |
| POST | /salas | Crea una sala |
| DELETE | /salas/:idSala | Elimina una sala |
| GET | /blog/:idUsuario | Obtiene todos los blogs del cliente |
| GET | /blog | Obtiene todos los blogs |
| POST | /blog | Crea un blog |
| DELETE | /blog/:idBlog | Elimina un blog |
| GET | /comentarioBlog/:idBlog | Obtiene todos los comentarios del blog |
| POST | /comentarioBlog | Crea un comentario |
| PUT | /upload/Users/:idUsuario | Actualiza la imagen de perfil de un usuario |
| GET | /upload/Users/:idUsuario | Obtiene la imagen de perfil de un usuario |