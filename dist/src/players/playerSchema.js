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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.selectRandomPlayersSchema = exports.createTeamSchema = exports.addPlayerSchema = void 0;
// validationSchemas.ts
const Yup = __importStar(require("yup"));
// Middleware to validate schema
const validate = (schema) => (req, res, next) => {
    schema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({ error: err.message }));
};
exports.validate = validate;
const addPlayerSchema = Yup.object().shape({
    id: Yup.number().required('ID is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    apt: Yup.number()
        .positive('apt number must be a positive number')
        .min(1, 'apt must be a positive number')
        .max(100, 'apt must be at most 100')
        .required('Apartment number is required'),
    set_score: Yup.number().required('Set score is required'),
    position: Yup.string().oneOf(['defender', 'midfielder', 'forward', 'goalkeeper'], 'Invalid position').required('Position is required'),
    nationalAssociation: Yup.string().required('National association is required')
});
exports.addPlayerSchema = addPlayerSchema;
const createTeamSchema = Yup.object().shape({
    numDefenders: Yup.number()
        .required()
        .transform(value => Number(value))
        .positive()
        .integer(),
    numMidfielders: Yup.number()
        .required()
        .transform(value => Number(value))
        .positive()
        .integer(),
    numAttackers: Yup.number()
        .required()
        .transform(value => Number(value))
        .positive()
        .integer()
});
exports.createTeamSchema = createTeamSchema;
const selectRandomPlayersSchema = Yup.object().shape({
    query: Yup.object({
        numberOfPlayers: Yup.number()
            .required()
            .positive()
            .integer()
    })
});
exports.selectRandomPlayersSchema = selectRandomPlayersSchema;
