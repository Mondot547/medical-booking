// server.js
const express = require('express');
const mongoose = require('mongoose');
const reservationRoutes = require('../routes/reservationRoutes');

const app = express();
app.use(express.json());

const uri = 'mongodb+srv://Alex:alex@bienetre.6htgv7f.mongodb.net/?retryWrites=true&w=majority&appName=bienEtre';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/', reservationRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});