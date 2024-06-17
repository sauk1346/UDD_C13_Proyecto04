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