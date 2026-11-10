# API RESTful de Biblioteca Digital

API RESTful desarrollada con Node.js, Express, TypeScript, MongoDB y Mongoose para administrar una colección de libros.

El proyecto utiliza una arquitectura organizada siguiendo el patrón MVC y permite realizar operaciones CRUD sobre libros.

## Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Git
- GitHub

## Arquitectura

El proyecto utiliza una estructura basada en MVC:

```text
src/
├── config/
│   └── database.ts
├── controllers/
│   └── bookController.ts
├── interfaces/
│   └── book.interface.ts
├── models/
│   └── Book.ts
├── routes/
│   └── bookRoutes.ts
├── utils/
│   └── response.ts
└── index.ts
```

### Modelo

`src/models/Book.ts`

Define el esquema utilizado por Mongoose para almacenar los libros en MongoDB.

### Controlador

`src/controllers/bookController.ts`

Contiene la lógica de los endpoints y las operaciones CRUD.

### Rutas

`src/routes/bookRoutes.ts`

Define las rutas HTTP disponibles para trabajar con libros.

### Configuración

`src/config/database.ts`

Gestiona la conexión con MongoDB mediante Mongoose.

### Utilidades

`src/utils/response.ts`

Contiene funciones reutilizables para estandarizar las respuestas de la API.

---

## Modelo Book

Cada libro utiliza los siguientes campos:

| Campo           | Tipo    | Requerido | Descripción                            |
| --------------- | ------- | --------- | -------------------------------------- |
| `title`         | string  | Sí        | Título del libro. Debe ser único.      |
| `author`        | string  | Sí        | Autor del libro.                       |
| `publishedYear` | number  | No        | Año de publicación.                    |
| `genre`         | string  | No        | Género del libro.                      |
| `available`     | boolean | No        | Disponibilidad. Por defecto es `true`. |

Mongoose también genera automáticamente el campo `_id`.

El proyecto utiliza `timestamps`, por lo que los documentos también incluyen:

- `createdAt`
- `updatedAt`

---

## Requisitos

Para ejecutar el proyecto se necesita:

- Node.js
- npm
- MongoDB

MongoDB debe estar instalado y ejecutándose.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Sachitaa02/biblioteca-api-rest.git
```

Ingresar al proyecto:

```bash
cd biblioteca-api-rest
```

Instalar las dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Se puede utilizar `.env.example` como referencia.

Contenido:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/biblioteca
```

La aplicación utiliza:

```ts
process.loadEnvFile();
```

para cargar las variables de entorno.

El archivo `.env` no se encuentra incluido en el repositorio por razones de configuración y seguridad.

---

## Compilar el proyecto

Ejecutar:

```bash
npm run build
```

TypeScript compilará los archivos de `src/` dentro de:

```text
dist/
```

---

## Ejecutar la API

Ejecutar:

```bash
npm start
```

Si la conexión es correcta, la consola mostrará algo similar a:

```text
MongoDB conectado correctamente.
Servidor ejecutándose en http://localhost:3000
```

---

## Ruta principal

### GET `/`

Permite comprobar que la API está funcionando.

Ejemplo:

```text
http://localhost:3000
```

Respuesta:

```json
{
  "success": true,
  "message": "API de Biblioteca funcionando"
}
```

---

# Endpoints

## GET `/books`

Obtiene todos los libros almacenados.

```http
GET /books
```

Ejemplo de respuesta:

```json
{
  "success": true,
  "message": "Libros obtenidos correctamente.",
  "data": [
    {
      "_id": "691234567890abcdef123456",
      "title": "El Principito",
      "author": "Antoine de Saint-Exupéry",
      "publishedYear": 1943,
      "genre": "Ficción",
      "available": true
    }
  ]
}
```

---

## GET `/books/:id`

Obtiene un libro utilizando su ID.

```http
GET /books/ID
```

Ejemplo:

```text
http://localhost:3000/books/691234567890abcdef123456
```

---

## POST `/books`

Crea un nuevo libro.

```http
POST /books
```

Ejemplo de cuerpo JSON:

```json
{
  "title": "El Principito",
  "author": "Antoine de Saint-Exupéry",
  "publishedYear": 1943,
  "genre": "Ficción"
}
```

Si no se especifica `available`, Mongoose utiliza:

```json
{
  "available": true
}
```

---

## PATCH `/books/:id`

Actualiza parcialmente un libro existente.

```http
PATCH /books/ID
```

Por ejemplo, para cambiar solamente su disponibilidad:

```json
{
  "available": false
}
```

También pueden modificarse varios campos:

```json
{
  "genre": "Literatura infantil",
  "available": true
}
```

---

## DELETE `/books/:id`

Elimina un libro utilizando su ID.

```http
DELETE /books/ID
```

Cuando se elimina correctamente, la API responde con el documento eliminado.

---

# Ejemplos utilizando curl

## Crear un libro

```bash
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{"title":"El Principito","author":"Antoine de Saint-Exupéry","publishedYear":1943,"genre":"Ficción"}'
```

## Listar libros

```bash
curl http://localhost:3000/books
```

## Obtener por ID

```bash
curl http://localhost:3000/books/ID
```

## Actualizar

```bash
curl -X PATCH http://localhost:3000/books/ID \
-H "Content-Type: application/json" \
-d '{"available":false}'
```

## Eliminar

```bash
curl -X DELETE http://localhost:3000/books/ID
```

---

# Respuestas de la API

Las respuestas siguen una estructura uniforme.

### Operación exitosa

```json
{
  "success": true,
  "message": "Descripción de la operación.",
  "data": {}
}
```

### Operación con error

```json
{
  "success": false,
  "message": "Descripción del error."
}
```

---

## Códigos HTTP utilizados

| Código | Significado                             |
| ------ | --------------------------------------- |
| `200`  | Operación realizada correctamente       |
| `201`  | Recurso creado correctamente            |
| `400`  | Datos o ID inválidos                    |
| `404`  | Libro no encontrado                     |
| `409`  | Conflicto, por ejemplo título duplicado |
| `500`  | Error interno del servidor              |

---

## Validaciones

La API contempla, entre otros casos:

- `title` obligatorio.
- `author` obligatorio.
- `title` único.
- `available` con valor predeterminado `true`.
- Validación de identificadores de MongoDB.
- Libro inexistente.
- Títulos duplicados.
- Validaciones de Mongoose.
- Manejo de errores mediante `try/catch`.

---

## Scripts disponibles

### Compilar TypeScript

```bash
npm run build
```

### Ejecutar la API

```bash
npm start
```

---

## Base de datos

La aplicación utiliza la base de datos:

```text
biblioteca
```

La conexión local predeterminada es:

```text
mongodb://127.0.0.1:27017/biblioteca
```

La colección utilizada por Mongoose para el modelo `Book` es:

```text
books
```

---

## Autor

Trabajo Práctico de Backend — API RESTful de Biblioteca Digital.

Ciro B.
