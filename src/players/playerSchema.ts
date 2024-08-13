// validationSchemas.ts
import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

// Middleware to validate schema
const validate = (schema: Yup.ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction): void => {
  schema.validate(req.body)
    .then(() => next())
    .catch((err: Yup.ValidationError) => res.status(400).json({ error: err.message }));
};

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

const selectRandomPlayersSchema = Yup.object().shape({
  query: Yup.object({
    numberOfPlayers: Yup.number()
      .required()
      .positive()
      .integer()
  })
});

export {
  addPlayerSchema,
  createTeamSchema,
  selectRandomPlayersSchema,
  validate
};
