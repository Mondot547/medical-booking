const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

router.use(cors(corsOptions));

router.post('/api/reservations', reservationController.createReservation);
router.get('/api/reservations', reservationController.getAllReservations);
router.put('/api/reservations/:id', reservationController.updateReservation);
router.delete('/api/reservations/:id', reservationController.deleteReservation);

module.exports = router;
