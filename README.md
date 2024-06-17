
**\[UDD] Desarrollo Web Fullstack C13**

# Proyecto 04: Reservas Hoteleras

## Tabla de Contenidos 




- [Proyecto 04: Reservas Hoteleras](#proyecto-04-reservas-hoteleras)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [1. Descripción](#1-descripción)
  - [2. Desarrollo](#2-desarrollo)
    - [2.1. Arquitectura de carpetas](#21-arquitectura-de-carpetas)
    - [2.2. JSON y herramientas de desarrollo](#22-json-y-herramientas-de-desarrollo)
    - [2.3. `server.js`](#23-serverjs)
    - [2.4. `reservaModel.js`](#24-reservamodeljs)
    - [2.5. `reservaRoutes.js`](#25-reservaroutesjs)
    - [2.6. `reservaController.js`](#26-reservacontrollerjs)
  - [3. Conclusión](#3-conclusión)
  - [4. Referencias](#4-referencias)






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

```sh
npm init -y
npm i -D nodemon
npm i express dotenv axios moment
```

Estas instrucciones en la terminal corresponden a la creación del archivo `package.json` y herramientas de desarrollo necesarias para creación del proyecto.

Una vez creado `package.json`, se agrega la siguiente instrucción en el campo `scripts`:
```sh
"start": "node server.js
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

## 3. Conclusión

## 4. Referencias
- UDD BootCamp Web FullStack, clases 13 a 16, Profesor [Matías Molina Aguilar ](https://cl.linkedin.com/in/matiasmolinaaguilar)
- Youtube@TheCoderCaveEsp: [¿Qué es MVC? - Aprende MVC en 10 minutos!](https://www.youtube.com/watch?v=UU8AKk8Slqg)
- Youtube@PedroTech: [MVC Pattern Explained Easy | MVC Tutorial (Example in NodeJS)](https://www.youtube.com/watch?v=bQuBlR0T5cc)
- Pleth: [200, 301, 404, & Other Numbers: HTTP Error Codes](https://www.pleth.com/posts/200-301-404-other-numbers-http-error-codes)