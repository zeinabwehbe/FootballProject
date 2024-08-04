const express = require('express');
const router = express.Router();
const playerController = require('./playerController');

router.post('/add',playerController.addPlayer);
router.get('/',playerController.getPlayers);
router.post('/create-team', playerController.createTeam);
router.get('/select-random', playerController.selectRandomPlayers);
router.get('/position-report', playerController.generatePositionReport);
router.get('/apt-report', playerController.generateAptReport);
router.get('/highest-apt', playerController.findPlayerWithHighestApt);
router.get('/lowest-avg', playerController.findPlayerWithLowestAvg);

module.exports = router;
