# Crypto 3MIT Backend
Este proyecto tiene la finalidad de ofrecerle al frontend autenticacion (con JWT) y persistensia en los datos (con MongoDB)

## ¿Como ejecuto el proyecto?
Solo hace falta crear el archivo `.env` con las variables de entorno necesarias (puedes observar el archivo `.env.example` para saberlo) y ejecutar los siguientes comandos:

### Yarn:
```sh
yarn install
yarn start
```

### NPM:
```sh
npm install
npm run start
```

## Endpoints
Para ver el detalle de cada uno puedes ver su `router` en la carpeta `routers`

### Auth
- `api/v1/auth/register`
  - Método: `POST`
  - Descripción: Registro de usuarios


- `api/v1/auth/login`
  - Método: `POST`
  - Descripción: Inicio de sesión del usuario

### Portfolio
- `api/v1/portfolio`
  - Método: `GET`
  - Descripción: Detalle del portfolio del usuario
  - Necesita autenticación

### Transactions
- `api/v1/transactions`
  - Método: `POST`
  - Descripción: Crea una transacción
  - Necesita autenticación

- `api/v1/transactions/:id`
  - Método: `GET`
  - Descripción: Obtiene el detalle de una transaccioón
  - Necesita autenticación

- `api/v1/transactions`
  - Método: `GET`
  - Descripción: Obtiene un listado de todas las transacciones del usuario
  - Necesita autenticación
