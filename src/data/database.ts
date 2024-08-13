// db.js



import { createConnection, Connection } from 'mysql2/promise';

async function getConnection(): Promise<Connection> {
    const connection = await createConnection({
        host: 'localhost',     // replace with your database host
        user: 'root',          // replace with your database user
        password: 'MySql123',  // replace with your database password
        database: 'footballproject' // replace with your database name
    });
    return connection;
}

export default getConnection;
