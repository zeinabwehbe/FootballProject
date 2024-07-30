// db.js

const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'localhost',     // replace with your database host
  user: 'root',          // replace with your database user
  password: 'MySql123',  // replace with your database password
  database: 'footballproject' // replace with your database name
};

async function getConnection() {
  const connection = await mysql.createConnection(connectionConfig);
  return connection;
}

module.exports = getConnection;
