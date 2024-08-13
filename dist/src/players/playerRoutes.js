"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.ts
const express_1 = __importDefault(require("express"));
const playerController = __importStar(require("./playerController"));
const playerSchema_1 = require("./playerSchema");
const router = express_1.default.Router();
router.post('/add', (0, playerSchema_1.validate)(playerSchema_1.addPlayerSchema), playerController.addPlayer);
router.post('/create-team', (0, playerSchema_1.validate)(playerSchema_1.createTeamSchema), playerController.createTeam);
router.get('/select-random', playerController.selectRandomPlayers);
router.get('/', playerController.getPlayers);
router.get('/position-report', playerController.generatePositionReport);
router.get('/apt-report', playerController.generateAptReport);
router.get('/highest-apt', playerController.findPlayerWithHighestApt);
router.get('/lowest-avg', playerController.findPlayerWithLowestAvg);
exports.default = router;
