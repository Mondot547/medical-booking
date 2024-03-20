// Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    soin: {
        type: String,
        required: true
    },
    praticien: {
        type: String,
        required: true
    }
    // Ajoutez d'autres champs selon vos besoins
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;