const getConnection = require('../data/database')

// added function => must be registered at end of this code => & navigate to Routes: router.method()

// API to gather player info 
const addPlayer = async (req, res) => 
{
    const { firstName, lastName, apt, set_score, position, nationalAssociation } = req.body;
    const AVG = (parseInt(apt) + parseInt(set_score)) / 2;

    const connection = await getConnection();

    await connection.execute(
    'INSERT INTO players (firstName, lastName, apt, set_score, position, nationalAssociation, AVG) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, apt, set_score, position, nationalAssociation, AVG]
    );
    await connection.end();
    res.status(201).json('Player added successfully'); 
};

    // API to display player info -2-
    const getPlayers = async (req, res) => {
    const connection = await getConnection();
    const [result] = await connection.execute('Select * from players');
    res.json(result);
    await connection.end();

    }; 

    //api to create a team, passing by query the parameters
    const createTeam = async (req, res) => {
    const {numDefenders,numMidfielders, numAttackers} = req.body;

    const totalPlayers = parseInt(numDefenders) + parseInt(numMidfielders) + parseInt(numAttackers);
    // console.log(totalPlayers);

    if (totalPlayers !== 10) {
    return res.status(400).send('Total number of players must be 10');
    }
    const connection = await getConnection();

    const [defenders] = await connection.execute('SELECT * FROM players WHERE position="defender" ORDER BY apt DESC LIMIT ?',
    [numDefenders]);
    const [midfielders] = await connection.execute(
    'SELECT * FROM players WHERE position="midfielder" ORDER BY apt DESC LIMIT ?', [numMidfielders]
    );
    const [attackers] = await connection.execute(
    'SELECT * FROM players WHERE position="attacker" ORDER BY apt DESC LIMIT ?',
    [numAttackers]
    );

    const yourTeam = [...defenders, ...midfielders, ...attackers];
    res.json(yourTeam);

    await connection.end();

};


const selectRandomPlayers = async (req, res) => {
const { numItems } = req.query;

const connection = await getConnection();

if (numItems <= 0 || numItems > players.length) {
return res.status(400).json({ message: 'Invalid number. Please enter a positive integer.' });
}

const [result] = await connection.execute('SELECT * FROM players ORDER BY RAND() LIMIT ?;', [numItems]);

res.json(result);
await connection.end();
res.status(201).json('random get successfully');

};

const generatePositionReport =  async (req, res) => {
try {
const connection = await getConnection();

const [defenderCount] = await connection.execute(
"SELECT COUNT(*) AS count FROM players WHERE position = 'defender'"
);
const [midfielderCount] = await connection.execute(
"SELECT COUNT(*) AS count FROM players WHERE position = 'midfielder'"
);
const [attackerCount] = await connection.execute(
"SELECT COUNT(*) AS count FROM players WHERE position = 'attacker'"
);

const defenders = defenderCount[0].count;
const midfielders = midfielderCount[0].count;
const attackers = attackerCount[0].count;

res.json({ defenders, midfielders, attackers });

await connection.end();
} catch (error) {
console.error('Error executing query:', error);
res.status(500).send('An error occurred while generating the position report');
}
};

const generateAptReport =  async (req, res) => {
try {
const connection = await getConnection();

// Fetch players and sort by 'apt' in descending order
const [players] = await connection.execute(
"SELECT * FROM players ORDER BY apt DESC"
);

res.json(players);

await connection.end();
} catch (error) {
console.error('Error executing query:', error);
res.status(500).send('An error occurred while generating the aptitude report');
}
};

const findPlayerWithHighestApt = async (req, res) => {
try {
const connection = await getConnection();

// Query to fetch the player with the maximum 'apt' value
const [result] = await connection.execute(
"SELECT * FROM players ORDER BY apt DESC LIMIT 1"
);

if (result.length === 0) {
return res.status(404).send('No players found');
}

const maxPlayer = result[0];

res.json(maxPlayer);

await connection.end();
} catch (error) {
console.error('Error executing query:', error);
res.status(500).send('An error occurred while fetching the player with the maximum aptitude');
}
};


const findPlayerWithLowestAvg =  async (req, res) => {
try {
const connection = await getConnection();

// Query to fetch the player with the minimum 'AVG' value
const [result] = await connection.execute(
"SELECT * FROM players ORDER BY AVG ASC LIMIT 1"
);

if (result.length === 0) {
return res.status(404).send('No players found');
}

const minPlayer = result[0];

res.json(minPlayer);

await connection.end();
} catch (error) {
console.error('Error executing query:', error);
res.status(500).send('An error occurred while fetching the player with the minimum average');
}
};
module.exports = {
addPlayer,
getPlayers,
createTeam,
selectRandomPlayers,
generatePositionReport,
generateAptReport,
findPlayerWithHighestApt,
findPlayerWithLowestAvg
};
