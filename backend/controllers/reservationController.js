// reservationController.js
const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const { fullName, email, date } = req.body;
        const reservation = new Reservation({ fullName, email, date });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Ajoutez d'autres méthodes pour les autres opérations CRUD