//usually each service has one jjob
//and can be reused
//arguments can be used in execute statement by [arg] or if it is not supported use ${arg}
// playerService.js
const getConnection = require('../data/database');

const addPlayer = async ({ firstName, lastName, apt, set_score, position, nationalAssociation }) => {
    const AVG = (parseInt(apt) + parseInt(set_score)) / 2;
    const connection = await getConnection();
    await connection.execute(
        'INSERT INTO players (firstName, lastName, apt, set_score, position, nationalAssociation, AVG) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, apt, set_score, position, nationalAssociation, AVG]
    );
    await connection.end();
};

const getPlayers = async () => {
    const connection = await getConnection();
    const [result] = await connection.execute('SELECT * FROM players');
    await connection.end();
    return result;
};

const createTeam = async ({ numDefenders, numMidfielders, numAttackers }) => {
    const totalPlayers = parseInt(numDefenders) + parseInt(numMidfielders) + parseInt(numAttackers);
    if (totalPlayers !== 10) {
        throw new Error('Total number of players must be 10');
    }
    const connection = await getConnection();
    const [defenders] = await connection.execute(
        'SELECT * FROM players WHERE position="defender" ORDER BY apt DESC LIMIT ?',
        [numDefenders]
    );
    const [midfielders] = await connection.execute(
        'SELECT * FROM players WHERE position="midfielder" ORDER BY apt DESC LIMIT ?',
        [numMidfielders]
    );
    const [attackers] = await connection.execute(
        'SELECT * FROM players WHERE position="attacker" ORDER BY apt DESC LIMIT ?',
        [numAttackers]
    );

    const [defenderCount] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'defender'"
    );
    const [midfielderCount] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'midfielder'"
    );
    const [attackerCount] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'attacker'"
    );

    if( parseInt(numAttackers) > attackerCount[0].count || parseInt(numDefenders) > defenderCount[0].count || parseInt(numMidfielders) > defenderCount[0].count){
        throw new Error('You have '+ attackerCount[0].count +' attackers,'+ defenderCount[0].count +' defenders,' + midfielderCount[0].count +' Midfielders');
    }
    const yourTeam = [...defenders, ...midfielders, ...attackers];
    await connection.end();
    return yourTeam;
};

const selectRandomPlayers = async (numItems) => {
    const connection = await getConnection();

    const [result] = await connection.execute(`SELECT * FROM players ORDER BY RAND() LIMIT ${numItems}`);

    await connection.end();
    return result;
};

const generatePositionReport = async () => {
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
    await connection.end();
    return {
        defenders: defenderCount[0].count,
        midfielders: midfielderCount[0].count,
        attackers: attackerCount[0].count
    };
};

const generateAptReport = async () => {
    const connection = await getConnection();
    const [players] = await connection.execute("SELECT * FROM players ORDER BY apt DESC");
    await connection.end();
    return players;
};

const findPlayerWithHighestApt = async () => {
    const connection = await getConnection();
    const [result] = await connection.execute("SELECT * FROM players ORDER BY apt DESC LIMIT 1");
    await connection.end();
    if (result.length === 0) {
        throw new Error('No players found');
    }
    return result[0];
};

const findPlayerWithLowestAvg = async () => {
    const connection = await getConnection();
    const [result] = await connection.execute("SELECT * FROM players ORDER BY AVG ASC LIMIT 1");
    await connection.end();
    if (result.length === 0) {
        throw new Error('No players found');
    }
    return result[0];
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
