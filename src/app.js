const express = require('express');
const app = express();

app.use(express.json());

const playerRoutes = require('./routes/playerRoutes');
app.use('/api/players', playerRoutes);

module.exports = app;
