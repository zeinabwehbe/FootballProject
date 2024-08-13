"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlayerWithLowestAvg = exports.findPlayerWithHighestApt = exports.generateAptReport = exports.generatePositionReport = exports.selectRandomPlayers = exports.createTeam = exports.getPlayers = exports.addPlayer = void 0;
const database_1 = __importDefault(require("../data/database"));
const addPlayer = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstName, lastName, apt, set_score, position, nationalAssociation }) {
    const AVG = (parseInt(apt) + parseInt(set_score)) / 2;
    const connection = yield (0, database_1.default)();
    yield connection.execute('INSERT INTO players (firstName, lastName, apt, set_score, position, nationalAssociation, AVG) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, apt, set_score, position, nationalAssociation, AVG]);
    yield connection.end();
});
exports.addPlayer = addPlayer;
const getPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, database_1.default)();
    const [result] = yield connection.execute('SELECT * FROM players');
    yield connection.end();
    return result;
});
exports.getPlayers = getPlayers;
const createTeam = (_a) => __awaiter(void 0, [_a], void 0, function* ({ numDefenders, numMidfielders, numAttackers }) {
    const totalPlayers = parseInt(numDefenders) + parseInt(numMidfielders) + parseInt(numAttackers);
    if (totalPlayers !== 10) {
        throw new Error('Total number of players must be 10');
    }
    const connection = yield (0, database_1.default)();
    const [defenders] = yield connection.execute('SELECT * FROM players WHERE position="defender" ORDER BY apt DESC LIMIT ?', [numDefenders]);
    const [midfielders] = yield connection.execute('SELECT * FROM players WHERE position="midfielder" ORDER BY apt DESC LIMIT ?', [numMidfielders]);
    const [attackers] = yield connection.execute('SELECT * FROM players WHERE position="attacker" ORDER BY apt DESC LIMIT ?', [numAttackers]);
    const [defenderCount] = yield connection.execute("SELECT COUNT(*) AS count FROM players WHERE position = 'defender'");
    const [midfielderCount] = yield connection.execute("SELECT COUNT(*) AS count FROM players WHERE position = 'midfielder'");
    const [attackerCount] = yield connection.execute("SELECT COUNT(*) AS count FROM players WHERE position = 'attacker'");
    if (parseInt(numAttackers) > defenderCount[0].count || parseInt(numDefenders) > defenderCount[0].count || parseInt(numMidfielders) > defenderCount[0].count) {
        throw new Error(`You have ${attackerCount[0].count} attackers, ${defenderCount[0].count} defenders, ${midfielderCount[0].count} midfielders`);
    }
    const yourTeam = [...defenders, ...midfielders, ...attackers];
    yield connection.end();
    return yourTeam;
});
exports.createTeam = createTeam;
const selectRandomPlayers = (numItems) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, database_1.default)();
    const [result] = yield connection.execute(`SELECT * FROM players ORDER BY RAND() LIMIT ${numItems}`);
    yield connection.end();
    return result;
});
exports.selectRandomPlayers = selectRandomPlayers;
const generatePositionReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, database_1.default)();
    const [defenderCount] = yield connection.execute("SELECT COUNT(*) AS count FROM players WHERE position = 'defender'");
    const [midfielderCount] = yield connection.execute("SELECT COUNT(*) AS count FROM players WHERE position = 'midfielder'");
    const [attackerCount] = yield connection.execute("SELECT COUNT(*) AS count FROM players WHERE position = 'attacker'");
    yield connection.end();
    return {
        defenders: defenderCount[0].count,
        midfielders: midfielderCount[0].count,
        attackers: attackerCount[0].count
    };
});
exports.generatePositionReport = generatePositionReport;
const generateAptReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, database_1.default)();
    const [players] = yield connection.execute("SELECT * FROM players ORDER BY apt DESC");
    yield connection.end();
    return players;
});
exports.generateAptReport = generateAptReport;
const findPlayerWithHighestApt = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, database_1.default)();
    const [result] = yield connection.execute("SELECT * FROM players ORDER BY apt DESC LIMIT 1");
    yield connection.end();
    if (result.length === 0) {
        throw new Error('No players found');
    }
    return result[0];
});
exports.findPlayerWithHighestApt = findPlayerWithHighestApt;
const findPlayerWithLowestAvg = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, database_1.default)();
    const [result] = yield connection.execute("SELECT * FROM players ORDER BY AVG ASC LIMIT 1");
    yield connection.end();
    if (result.length === 0) {
        throw new Error('No players found');
    }
    return result[0];
});
exports.findPlayerWithLowestAvg = findPlayerWithLowestAvg;
