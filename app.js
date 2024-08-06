const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const playerRoutes = require('./src/players/playerRoutes');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json());
app.use('/api/players', playerRoutes);



module.exports = app;
