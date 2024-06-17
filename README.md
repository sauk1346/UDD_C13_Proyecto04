
**\[UDD] Desarrollo Web Fullstack C13**

# Proyecto 04: Reservas Hoteleras

## Tabla de Contenidos 

- [1. Descripción](#1-descripción)
- [2. Desarrollo](#2-desarrollo)
    - [2.1. Arquitectura de carpetas](#21-arquitectura-de-carpetas)
    - [2.2. JSON y herramientas de desarrollo](#22-json-y-herramientas-de-desarrollo)
    - [2.3. `server.js`](#23-serverjs)
        - [2.3.1. Descripción del código](#231-descripción-del-código)
    - [2.4. `reservaModel.js`](#24-reservamodeljs)
        - [2.4.1. Descripción del código](#241-descripción-del-código)
    - [2.5. `reservaRoutes.js`](#25-reservaroutesjs)
        - [2.5.1. Descripción del código](#251-descripción-del-código)
    - [2.6. `reservaController.js`](#26-reservacontrollerjs)
        - [2.6.1. Descripción del código](#261-descripción-del-código)
- [3. Pruebas](#3-pruebas)
- [4. Conclusión](#4-conclusión)
- [5. Referencias](#5-referencias)


## 1. Descripción
El proyecto consiste en la creación de una aplicación de servicios para la gestión de reserva de hoteles que involucre las 4 operaciones `CRUD` y otras 6 adicionales relacionadas con filtros, utilizando *Node.js* y *Express*.
## 2. Desarrollo

### 2.1. Arquitectura de carpetas

```
Proyecto04
├───controllers
│   └─reservasController.js
├───models
│   └─reservaModel.js
├───node_modules
├───routes     
│   └─reservasRoutes.js
├───.env       
├───.gitignore
├───package-lock.json
├───package.json
├───README.md
└───server.js       
```

Los archivos de interés son

- `server.js`: permite configuración general, middleware global y montar ruta.
- `reservaModel.js`: define un modelo de datos para las reservas de la aplicación.
- `reservaRoutes.js`: define las rutas de la aplicación para manejar las solicitudes HTTP.
- `reservaController.js`: contiene funciones que permiten interactuar con el modelo para obtener y manipular datos.

### 2.2. JSON y herramientas de desarrollo

```bash
npm init -y
npm i -D nodemon
npm i express dotenv axios moment
```

Estas instrucciones en la terminal corresponden a la creación del archivo `package.json` y herramientas de desarrollo necesarias para creación del proyecto.

Una vez creado `package.json`, se agrega la siguiente instrucción en el campo `scripts`:

```json
"start": "node server.js"
```

### 2.3. `server.js`

```javascript
require('dotenv').config();
const express = require('express');
const reservasRoutes = require('./routes/reservasRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //middleware para procesar peticiones tipo JSON

app.use('/api/reservas', reservasRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});
```

#### 2.3.1. Descripción del código

1. Carga variables de entorno desde un archivo `.env`
2. Importa módulo `express` para manejar los distintos tipos de solicitudes HTTP.
3. Importa módulo `reservasRoutes`, el cual contiene las rutas relacionadas con las reservas.
4. Crea una instancia `app` de `express` para manejar las solicitudes.
5. Configura el puerto según el valor de la variable de entorno `PORT` o 3000 en su defecto.
6. Agrega middleware para que el servidor pueda procesar solicitudes entrantes con body en formato JSON.
7. Monta las rutas de `reservasRoutes` en el directorio `api/reservas`.
8. Inicia el servidor en el puerto designado y verifica mediante un mensaje en consola.

### 2.4. `reservaModel.js`

```javascript
class Reserva {
    constructor(id, hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes) {
        this.id = id;
        this.hotel = hotel;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.tipo_habitacion = tipo_habitacion;
        this.estado = estado;
        this.num_huespedes = num_huespedes;
    }
}

module.exports = Reserva;
```

#### 2.4.1. Descripción del código

1. Clase 'Reserva'. Representa el modelo del patrón de diseño MVC. 

### 2.5. `reservaRoutes.js`

```javascript
const express = require('express');
const reservasController = require('../controllers/reservasController');

const router = express.Router();

router.post('/', reservasController.createReserva);
router.get('/', reservasController.getReservas);
router.get('/:id', reservasController.getReservaById);
router.put('/:id', reservasController.updateReserva);
router.delete('/:id', reservasController.deleteReserva);

module.exports = router;
```

#### 2.5.1. Descripción del código

1. Importa módulo `express` para crear el enrutador.
2. Importa módulo `reservasController` el cual contiene las funciones que manejan las operaciones CRUD.
3. Crea un objeto enrutador `router` de `express` para definir las rutas y manejar las solicitudes HTTP.
4. Definicion de rutas
    - **`POST /`**: Define una ruta para manejar solicitudes POST en la raíz del directorio del enrutador. Cuando se recibe una solicitud POST en esta ruta, se llama a la función `createReserva` del controlador `reservasController`.
    - **`GET /`**: Define una ruta para manejar solicitudes GET en la raíz del directorio del enrutador. Cuando se recibe una solicitud GET en esta ruta, se llama a la función `getReservas` del controlador `reservasController`.
    - **`GET /:id`**: Define una ruta para manejar solicitudes GET que contienen un parámetro `id`. Cuando se recibe una solicitud GET con un indicador específico (id) en esta ruta, se llama a la función `getReservaById` del controlador `reservasController`.
    - **`PUT /:id`**: Define una ruta para manejar solicitudes PUT que contienen un parámetro `id`. Cuando se recibe una solicitud PUT con un indicador específico (id) en esta ruta, se llama a la función `updateReserva` del controlador `reservasController`-
    -  **`DELETE /:id`** Define una ruta para manejar las solicitudes DELETE que contienen un parámetro `id`, Cuando se recibe una solicitud DELETE con identificador específico (id) en esta ruta, se llama a la función `deleteReserva` del controlador `reservasController`.

### 2.6. `reservaController.js`

```javascript
const Reserva = require('../models/reservaModel');
const moment = require('moment');
let reservas = [];

exports.createReserva = async (req, res) => {
  const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.body;
  const newReserva = new Reserva(reservas.length + 1, hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes)
  
  reservas.push(newReserva);
  
  res.status(201).json({
    msg: "Reserva creada con éxito.",
    data: newReserva
  })
}

exports.getReservas = async (req, res) => {
  const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

  if (hotel) {
    const reservasFiltered = reservas.filter(reserva => reserva.hotel === hotel);
    if (reservasFiltered.length === 0) {
      return res.status(404).json({ msg: "No se encontraron reservas para el hotel especificado." });
    }
    return res.json({
      msg: "Reservas filtradas por hotel", 
      data: reservasFiltered
    });
  } 
  else if (fecha_inicio && fecha_fin) {
    const startDate = moment(fecha_inicio);
    const endDate = moment(fecha_fin);

    const reservasFiltered = reservas.filter(reserva => moment(reserva.fecha_inicio).isBetween(startDate, endDate, null, '[]'));
    if (reservasFiltered.length === 0) {
      return res.status(404).json({ msg: "No se encontraron reservas para las fechas especificadas." });
    }
    return res.json({
      msg: "Reservas filtradas por fecha",
      data: reservasFiltered
    });
  }
  else if (tipo_habitacion) {
    const reservasFiltered = reservas.filter(reserva => reserva.tipo_habitacion === tipo_habitacion);
    if (reservasFiltered.length === 0) {
      return res.status(404).json({ msg: "No se encontraron reservas para el tipo de habitación especificado." });
    }
    return res.json({
      msg: "Reservas filtradas por tipo habitación",
      data: reservasFiltered
    });
  }
  else if (estado) {
    const reservasFiltered = reservas.filter(reserva => reserva.estado === estado);
    if (reservasFiltered.length === 0) {
      return res.status(404).json({ msg: "No se encontraron reservas para el estado especificado." });
    }
    return res.json({
      msg: "Reservas filtradas por estado",
      data: reservasFiltered
    });
  }
  else if (num_huespedes) {
    const reservasFiltered = reservas.filter(reserva => reserva.num_huespedes === parseInt(num_huespedes));
    if (reservasFiltered.length === 0) {
      return res.status(404).json({ msg: "No se encontraron reservas para el número de huéspedes especificado." });
    }
    return res.json({
      msg: "Reservas filtradas por número de huéspedes",
      data: reservasFiltered
    });
  }
  else {
    return res.json({
      msg: "Lista total de reservas",
      data: reservas
    });
  }
}

exports.getReservaById = async (req, res) => {
  const idReserva = parseInt(req.params.id);
  const reserva = reservas.find(reserva => reserva.id === idReserva);

  if (!reserva) {
    return res.json({ error: 'Reserva no encontrada.' });
  }
 
  res.json({
    msg: "Reserva por id",
    data: reserva
  });
}

exports.updateReserva = async (req, res) => {
  const idReserva = parseInt(req.params.id);
  const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.body;

  let reservaUpdated = reservas.find(reserva => reserva.id === idReserva);

  if (!reservaUpdated) {
    return res.json({ error: 'Reserva no encontrada.' });
  }

  if (hotel) reservaUpdated.hotel = hotel;
  if (fecha_inicio) reservaUpdated.fecha_inicio = fecha_inicio;
  if (fecha_fin) reservaUpdated.fecha_fin = fecha_fin;
  if (tipo_habitacion) reservaUpdated.tipo_habitacion = tipo_habitacion;
  if (estado) reservaUpdated.estado = estado;
  if (num_huespedes) reservaUpdated.num_huespedes = num_huespedes;

  res.json(reservaUpdated);
}

exports.deleteReserva = async (req, res) => {
  const idReserva = parseInt(req.params.id);
  const longitudInicial = reservas.length;

  reservas = reservas.filter(reserva => reserva.id !== idReserva);

  if (reservas.length === longitudInicial) {
    return res.status(404).json({ error: 'Reserva no encontrada.' });
  }

  res.status(204).end();
}
```

#### 2.6.1. Descripción del código

Proporciona las funciones necesarias para manejar las operaciones CRUD.

**`createReserva`**

- Maneja las solicitudes POST para crear una nueva reserva.
- Extrae los datos necesarios (`hotel`, `fecha_inicio`, `fecha_fin`, `tipo_habitacion`, `estado`, `num_huespedes`) del cuerpo de la solicitud (`req.body`).
- Crea una nueva instancia de Reserva utilizando el modelo definido en reservaModel.js.
- Agrega la nueva reserva al array reservas.
- Devuelve una respuesta JSON con un código de estado 201 (Creado) y los datos de la reserva creada.

**`getReservas`**

- Maneja las solicitudes GET para recuperar reservas, con posibilidad de filtrar por varios criterios (if-anidados).
- Utiliza parámetros de consulta (`hotel`, `fecha_inicio`, `fecha_fin`, `tipo_habitacion`, `estado`, `num_huespedes`) para filtrar las reservas almacenadas en reservas.
- Retorna un mensaje indicando si las reservas fueron filtradas por algún criterio específico o muestra la lista completa si no se aplican filtros.

**`getReservaById`**

- Maneja las solicitudes GET para recuperar una reserva específica por su ID.
- Extrae el ID de la reserva de los parámetros de la URL (`req.params.id`).
- Busca la reserva correspondiente en el array reservas usando el método find.
- Retorna la reserva encontrada en formato JSON, junto con un mensaje indicando que se encontró la reserva, o un mensaje de error si no se encuentra.

**`updateReserva`**

- Maneja las solicitudes PUT para actualizar una reserva existente por su ID.
- Extrae el ID de la reserva de los parámetros de la URL (`req.params.id`).
- Busca la reserva correspondiente en el array reservas usando el método find.
- Actualiza los campos de la reserva con los datos proporcionados en req.body, si se especifican.
- Retorna la reserva actualizada en formato JSON.

**`deleteReserva`**

- Maneja las solicitudes DELETE para eliminar una reserva por su ID.
- Extrae el ID de la reserva de los parámetros de la URL (`req.params.id`).
- Utiliza el método filter para eliminar la reserva del array reservas.
- Retorna un código de estado 204 (Sin contenido) si la reserva se elimina correctamente, o un mensaje de error si no se encuentra la reserva.

## 3. Pruebas

1. Se ejecuta el siguiente comando en terminal para iniciar el servidor:

```sh
npm run start
```

2. Se utiliza el plugin 'Thunder Client' para ejecutar las distintas request que se describen a continuación

3. `POST | http://localhost:3001/api/reservas`
    (20 veces) Agrega 20 reservas con datos aleatorios.
4. `GET | http://localhost:3001/api/reservas`
    Muestra lista completa de reservaciones.
5. `GET | http://localhost:3001/api/reservas/15`
    Obtiene información de la reserva con id = 15.
6. `PUT | http://localhost:3001/api/reservas/18`
    Actualiza datos de la reserva con id = 18.
7. `DELETE | http://localhost:3001/api/reservas/20`
    Elimina la reserva con id = 20.
8. `GET | http://localhost:3001/api/reservas?hotel=Hotel%20Riviera`
    Muestra todas las reservas correspondientes al 'Hotel Riviera'.
9. `GET | http://localhost:3001/api/reservas?fecha_inicio=2024-06-17&fecha_fin=2024-06-21`
    Muestra todas las reservas cuyo campo `fecha_inicio` está entre `2024-06-17` y `2024-06-21`.
10. `GET | http://localhost:3001/api/reservas?tipo_habitacion=triple`
    Muestra todas las reservas que poseen habitación triple.
11. `GET | http://localhost:3001/api/reservas?estado=pendiente`
    Muestra todas las reservas cuyo estado de pago es 'pendiente'.
12. `GET | http://localhost:3001/api/reservas?num_huespedes=4`
    Muestra todas las reservas cuyo número de huéspedes es 4.

## 4. Conclusión
Este proyecto permitió ahondar en el uso de Node.js y Express, así como también comprender el funcionamiento de las operaciones CRUD para el protocolo HTTP. Sumado con la correcta estructuración del proyecto y el uso de prácticas recomendadas como el patrón de diseño MVC, fue posible crear una API modular, mantenible y escalable.


## 5. Referencias
- UDD BootCamp Web FullStack, clases 13 a 16, Profesor [Matías Molina Aguilar](https://cl.linkedin.com/in/matiasmolinaaguilar)
- Youtube@TheCoderCaveEsp: [¿Qué es MVC? - Aprende MVC en 10 minutos!](https://www.youtube.com/watch?v=UU8AKk8Slqg)
- Youtube@PedroTech: [MVC Pattern Explained Easy | MVC Tutorial (Example in NodeJS)](https://www.youtube.com/watch?v=bQuBlR0T5cc)
- Pleth: [200, 301, 404, & Other Numbers: HTTP Error Codes](https://www.pleth.com/posts/200-301-404-other-numbers-http-error-codes)