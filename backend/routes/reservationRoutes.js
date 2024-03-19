// reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reservations', reservationController.createReservation);
router.get('/reservations', reservationController.getAllReservations);
// Ajoutez d'autres routes pour les autres opérations CRUD

module.exports = router;