const express = require('express');
const bodyParser = require('body-parser');
const playerRoutes = require('../playerRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/players', playerRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
