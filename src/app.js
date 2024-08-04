const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const playerRoutes = require('./players/playerRoutes');
app.use('/api/players', playerRoutes);

module.exports = app;
