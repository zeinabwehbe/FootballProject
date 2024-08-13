import { Request, Response } from 'express';
import * as playerService from './playerService';

const addPlayer = async (req: Request, res: Response): Promise<void> => {
    try {
        await playerService.addPlayer(req.body);
        res.status(201).json('Player added successfully');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error adding player:', error.message);
            res.status(500).send('An error occurred while adding the player');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};

const getPlayers = async (req: Request, res: Response): Promise<void> => {
    try {
        const players = await playerService.getPlayers();
        res.json(players);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching players:', error.message);
            res.status(500).send('An error occurred while fetching the players');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};

const createTeam = async (req: Request, res: Response): Promise<void> => {
    try {
        const yourTeam = await playerService.createTeam(req.body);
        res.json(yourTeam);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating team:', error.message);
            res.status(400).send(error.message);
        } else {
            console.error('Unexpected error:', error);
            res.status(400).send('An unexpected error occurred');
        }
    }
};

const selectRandomPlayers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { numItems } = req.query;
        const players = await playerService.selectRandomPlayers(parseInt(numItems as string));
        res.status(201).json(players);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error selecting random players:', error.message);
            res.status(500).send('An error occurred while selecting random players');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};

const generatePositionReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const report = await playerService.generatePositionReport();
        res.json(report);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error generating position report:', error.message);
            res.status(500).send('An error occurred while generating the position report');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};

const generateAptReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const report = await playerService.generateAptReport();
        res.json(report);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error generating aptitude report:', error.message);
            res.status(500).send('An error occurred while generating the aptitude report');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};

const findPlayerWithHighestApt = async (req: Request, res: Response): Promise<void> => {
    try {
        const player = await playerService.findPlayerWithHighestApt();
        res.json(player);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error finding player with highest aptitude:', error.message);
            res.status(500).send('An error occurred while finding the player with the highest aptitude');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};

const findPlayerWithLowestAvg = async (req: Request, res: Response): Promise<void> => {
    try {
        const player = await playerService.findPlayerWithLowestAvg();
        res.json(player);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error finding player with lowest average:', error.message);
            res.status(500).send('An error occurred while finding the player with the lowest average');
        } else {
            console.error('Unexpected error:', error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};

export default {
    addPlayer,
    getPlayers,
    createTeam,
    selectRandomPlayers,
    generatePositionReport,
    generateAptReport,
    findPlayerWithHighestApt,
    findPlayerWithLowestAvg
};

