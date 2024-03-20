import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Appointment = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleDateSelect = (e) => {
        setSelectedDate(e);
        setModalIsOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/reservations', formData);
            if (response.status !== 201) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }
            // Mettre à jour la liste des événements si nécessaire
            setEvents([...events, { ...formData, start: selectedDate, end: moment(selectedDate).add(1, 'hour') }]);
            // Fermer le modal après la soumission du formulaire
            setModalIsOpen(false);
        } catch (error) {
            console.error('Erreur:', error.message);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Réservation</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleDateSelect}
                style={{ height: 500 }}
                className="rounded-lg shadow-lg bg-white p-4"
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                className="modal text-center p-3 flex flex-col justify-center items-center"
                overlayClassName="overlay"
            >
                <h2 className="text-2xl font-bold mb-4">Formulaire de réservation</h2>
                <ReservationForm onSubmit={handleFormSubmit} />
            </Modal>
        </div>
    );
};

const ReservationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        tel: '',
        soin: '',
        praticien: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 container text-center">
            <input type="text" name="fullName" placeholder="Prénom" value={formData.fullname} onChange={handleChange} className="border-2 border-gray-300 rounded-md py-2 px-4 block w-full text-lg" />
            <input type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} className="border-2 border-gray-300 rounded-md py-2 px-4 block w-full text-lg" />
            <input type="text" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} className="border-2 border-gray-300 rounded-md py-2 px-4 block w-full text-lg" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border-2 border-gray-300 rounded-md py-2 px-4 block w-full text-lg" />
            <input type="tel" name="tel" placeholder="Téléphone" value={formData.tel} onChange={handleChange} className="border-2 border-gray-300 rounded-md py-2 px-4 block w-full text-lg" />

            <div className="relative">
                <select name="soin" value={formData.soin} onChange={handleChange} className="border-2 border-gray-300 rounded-md py-2 px-4 block w-full text-lg appearance-none">
                    <option value="" disabled hidden>Choisir un soin</option>
                    <option value="Soin 1">Hypnotherapeute</option>
                    <option value="Soin 2">Shiatsu</option>
                    <option value="Soin 3">Massage Ayurvedique</option>
                    {/* Ajoutez d'autres options selon vos besoins */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            <div className="relative">
                <select name="praticien" value={formData.praticien} onChange={handleChange} className="border-2 border-gray-300 rounded-md py-2 px-4 block w-full text-lg appearance-none">
                    <option value="" disabled hidden>Choisir un praticien</option>
                    <option value="Praticien 1">Sandra</option>
                    <option value="Praticien 2">Valerie</option>
                    <option value="Praticien 3">Alexandre</option>
                    {/* Ajoutez d'autres options selon vos besoins */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Réserver</button>
        </form>


    );
};
ReservationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired // onSubmit doit être une fonction requise
};
export default Appointment;
