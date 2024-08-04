const express = require('express');
const router = express.Router();
const playerController = require('./playerController');
const playerSchema = require('./playerSchema')
const { addPlayerSchema, createTeamSchema } = require('./playerSchema');

router.post('/add', playerSchema.validate(addPlayerSchema), playerController.addPlayer);
router.post('/create-team', playerSchema.validate(createTeamSchema), playerController.createTeam);
router.get('/select-random', playerController.selectRandomPlayers);

router.get('/',playerController.getPlayers);
router.get('/position-report', playerController.generatePositionReport);
router.get('/apt-report', playerController.generateAptReport);
router.get('/highest-apt', playerController.findPlayerWithHighestApt);
router.get('/lowest-avg', playerController.findPlayerWithLowestAvg);

module.exports = router;
