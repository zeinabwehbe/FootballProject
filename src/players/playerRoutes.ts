// router.ts
import express, { Router } from 'express';
import playerController from './playerController';
import { addPlayerSchema,validate,createTeamSchema } from './playerSchema';

const router: Router = express.Router();

router.post('/add', validate(addPlayerSchema), playerController.addPlayer);
router.post('/create-team', validate(createTeamSchema), playerController.createTeam);
router.get('/select-random', playerController.selectRandomPlayers);

router.get('/', playerController.getPlayers);
router.get('/position-report', playerController.generatePositionReport);
router.get('/apt-report', playerController.generateAptReport);
router.get('/highest-apt', playerController.findPlayerWithHighestApt);
router.get('/lowest-avg', playerController.findPlayerWithLowestAvg);

export default router;
