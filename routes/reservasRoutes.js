const express = require('express');
const reservasController = require('../controllers/reservasController');

const router = express.Router();

router.post('/', reservasController.createReserva);
router.get('/', reservasController.getReservas);
router.get('/:id', reservasController.getReservaById);
router.put('/:id', reservasController.updateReserva);
router.delete('/:id', reservasController.deleteReserva);

module.exports = router;
