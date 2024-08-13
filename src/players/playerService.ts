// playerService.ts
import { Connection,RowDataPacket } from 'mysql2/promise';
import getConnection from '../data/database';

interface Player {
    firstName: string;
    lastName: string;
    apt: string;
    set_score: string;
    position: string;
    nationalAssociation: string;
}

interface TeamComposition {
    numDefenders: string;
    numMidfielders: string;
    numAttackers: string;
}


const addPlayer = async ({ firstName, lastName, apt, set_score, position, nationalAssociation }: Player): Promise<void> => {
    const AVG = (parseInt(apt) + parseInt(set_score)) / 2;
    const connection: Connection = await getConnection();
    await connection.execute(
        'INSERT INTO players (firstName, lastName, apt, set_score, position, nationalAssociation, AVG) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, apt, set_score, position, nationalAssociation, AVG]
    );
    await connection.end();
};

const getPlayers = async (): Promise<any[]> => {
    const connection: Connection = await getConnection();
    const [result]: [any[], any] = await connection.execute('SELECT * FROM players');
    await connection.end();
    return result;
};

const createTeam = async ({ numDefenders, numMidfielders, numAttackers }: TeamComposition): Promise<any[]> => {
    const totalPlayers = parseInt(numDefenders) + parseInt(numMidfielders) + parseInt(numAttackers);
    if (totalPlayers !== 10) {
        throw new Error('Total number of players must be 10');
    }
    const connection: Connection = await getConnection();
    const [defenders]: [any[], any] = await connection.execute(
        'SELECT * FROM players WHERE position="defender" ORDER BY apt DESC LIMIT ?',
        [numDefenders]
    );
    const [midfielders]: [any[], any] = await connection.execute(
        'SELECT * FROM players WHERE position="midfielder" ORDER BY apt DESC LIMIT ?',
        [numMidfielders]
    );
    const [attackers]: [any[], any] = await connection.execute(
        'SELECT * FROM players WHERE position="attacker" ORDER BY apt DESC LIMIT ?',
        [numAttackers]
    );

    const [defenderCount]: [any[], any] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'defender'"
    );
    const [midfielderCount]: [any[], any] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'midfielder'"
    );
    const [attackerCount]: [any[], any] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'attacker'"
    );

    if (parseInt(numAttackers) > defenderCount[0].count || parseInt(numDefenders) > defenderCount[0].count || parseInt(numMidfielders) > defenderCount[0].count) {
        throw new Error(`You have ${attackerCount[0].count} attackers, ${defenderCount[0].count} defenders, ${midfielderCount[0].count} midfielders`);
    }
    const yourTeam = [...defenders, ...midfielders, ...attackers];
    await connection.end();
    return yourTeam;
};

const selectRandomPlayers = async (numItems: number): Promise<any[]> => {
    const connection: Connection = await getConnection();
    const [result]: [any[], any] = await connection.execute(`SELECT * FROM players ORDER BY RAND() LIMIT ${numItems}`);
    await connection.end();
    return result;
};

const generatePositionReport = async (): Promise<{ defenders: number; midfielders: number; attackers: number}> => {
    const connection: Connection = await getConnection();
    const [defenderCount]: [any[], any] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'defender'"
    );
    const [midfielderCount]: [any[], any] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'midfielder'"
    );
    const [attackerCount]: [any[], any] = await connection.execute(
        "SELECT COUNT(*) AS count FROM players WHERE position = 'attacker'"
    );
    await connection.end();
    return {
        defenders: defenderCount[0].count,
        midfielders: midfielderCount[0].count,
        attackers: attackerCount[0].count
    };
};

const generateAptReport = async (): Promise<any[]> => {
    const connection: Connection = await getConnection();
    const [players]: [any[], any] = await connection.execute("SELECT * FROM players ORDER BY apt DESC");
    await connection.end();
    return players;
};

const findPlayerWithHighestApt = async (): Promise<Player> => {
    const connection: Connection = await getConnection();
    const [result]: [RowDataPacket[], any] = await connection.execute("SELECT * FROM players ORDER BY apt DESC LIMIT 1");
    await connection.end();
    if (result.length === 0) {
        throw new Error('No players found');
    }
    return result[0] as Player;
};

const findPlayerWithLowestAvg = async (): Promise<Player> => {
    const connection: Connection = await getConnection();
    const [result]: [RowDataPacket[], any] = await connection.execute("SELECT * FROM players ORDER BY AVG ASC LIMIT 1");
    await connection.end();
    if (result.length === 0) {
        throw new Error('No players found');
    }
    return result[0] as Player;
};


export {
    addPlayer,
    getPlayers,
    createTeam,
    selectRandomPlayers,
    generatePositionReport,
    generateAptReport,
    findPlayerWithHighestApt,
    findPlayerWithLowestAvg
};
