const Reservation = require('../models/Reservation');

// Créer une réservation
exports.createReservation = async (req, res) => {
    try {
        const { fullName, lastName, address, email, tel, soin, praticien } = req.body;
        const reservation = new Reservation({ fullName, lastName, address, email, tel, soin, praticien });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire toutes les réservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire une réservation par ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une réservation
exports.updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, lastName, address, email, tel, soin, praticien } = req.body;
        const updatedReservation = await Reservation.updateOne({ _id: id }, { fullName, lastName, address, email, tel, soin, praticien });
        res.json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.deleteOne({ _id: id });
        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
