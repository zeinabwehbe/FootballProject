// added function => must be registered at end of this code => & navigate to Routes: router.method()

// API to gather player info 
// playerController.js
const playerService = require('./playerService');

const addPlayer = async (req, res) => {
    try {
        await playerService.addPlayer(req.body);
        res.status(201).json('Player added successfully');
    } catch (error) {
        console.error('Error adding player:', error);
        res.status(500).send('An error occurred while adding the player');
    }
};

const getPlayers = async (req, res) => {
    try {
        const players = await playerService.getPlayers();
        res.json(players);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).send('An error occurred while fetching the players');
    }
};

const createTeam = async (req, res) => {
    try {
        const yourTeam = await playerService.createTeam(req.body);
        res.json(yourTeam);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(400).send(error.message);
    }
};

const selectRandomPlayers = async (req, res) => {
    try {
        const { numItems } = req.query;
        const players = await playerService.selectRandomPlayers(parseInt(numItems));
        res.status(201).json(players);
    } catch (error) {
        console.error('Error selecting random players:', error);
        res.status(500).send('An error occurred while selecting random players');
    }
};

const generatePositionReport = async (req, res) => {
    try {
        const report = await playerService.generatePositionReport();
        res.json(report);
    } catch (error) {
        console.error('Error generating position report:', error);
        res.status(500).send('An error occurred while generating the position report');
    }
};

const generateAptReport = async (req, res) => {
    try {
        const report = await playerService.generateAptReport();
        res.json(report);
    } catch (error) {
        console.error('Error generating aptitude report:', error);
        res.status(500).send('An error occurred while generating the aptitude report');
    }
};

const findPlayerWithHighestApt = async (req, res) => {
    try {
        const player = await playerService.findPlayerWithHighestApt();
        res.json(player);
    } catch (error) {
        console.error('Error finding player with highest aptitude:', error);
        res.status(500).send('An error occurred while finding the player with the highest aptitude');
    }
};

const findPlayerWithLowestAvg = async (req, res) => {
    try {
        const player = await playerService.findPlayerWithLowestAvg();
        res.json(player);
    } catch (error) {
        console.error('Error finding player with lowest average:', error);
        res.status(500).send('An error occurred while finding the player with the lowest average');
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
