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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlayerWithLowestAvg = exports.findPlayerWithHighestApt = exports.generateAptReport = exports.generatePositionReport = exports.selectRandomPlayers = exports.createTeam = exports.getPlayers = exports.addPlayer = void 0;
const playerService = __importStar(require("./playerService"));
const addPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield playerService.addPlayer(req.body);
        res.status(201).json('Player added successfully');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error adding player:', error.message);
            res.status(500).send('An error occurred while adding the player');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.addPlayer = addPlayer;
const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield playerService.getPlayers();
        res.json(players);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching players:', error.message);
            res.status(500).send('An error occurred while fetching the players');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.getPlayers = getPlayers;
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const yourTeam = yield playerService.createTeam(req.body);
        res.json(yourTeam);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error creating team:', error.message);
            res.status(400).send(error.message);
        }
        else {
            console.error('Unexpected error:', error);
            res.status(400).send('An unexpected error occurred');
        }
    }
});
exports.createTeam = createTeam;
const selectRandomPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { numItems } = req.query;
        const players = yield playerService.selectRandomPlayers(parseInt(numItems));
        res.status(201).json(players);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error selecting random players:', error.message);
            res.status(500).send('An error occurred while selecting random players');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.selectRandomPlayers = selectRandomPlayers;
const generatePositionReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield playerService.generatePositionReport();
        res.json(report);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error generating position report:', error.message);
            res.status(500).send('An error occurred while generating the position report');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.generatePositionReport = generatePositionReport;
const generateAptReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield playerService.generateAptReport();
        res.json(report);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error generating aptitude report:', error.message);
            res.status(500).send('An error occurred while generating the aptitude report');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.generateAptReport = generateAptReport;
const findPlayerWithHighestApt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield playerService.findPlayerWithHighestApt();
        res.json(player);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error finding player with highest aptitude:', error.message);
            res.status(500).send('An error occurred while finding the player with the highest aptitude');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.findPlayerWithHighestApt = findPlayerWithHighestApt;
const findPlayerWithLowestAvg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield playerService.findPlayerWithLowestAvg();
        res.json(player);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error finding player with lowest average:', error.message);
            res.status(500).send('An error occurred while finding the player with the lowest average');
        }
        else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
});
exports.findPlayerWithLowestAvg = findPlayerWithLowestAvg;
