// //the middle ware, yup

// //selectPlayers, create, search in order to check if already available
// //yup is a validation for nodejs in order to test the type

// //some operations as delete need anpther ones, as search if it is exist before deleting it

// validationSchemas.jsconst { object, string, number } = require('yup');
const Yup = require('yup');
const { object, number, string } = require('yup');


// Middleware to validate schema
const validate = (schema) => (req, res, next) => {
  schema.validate(req.body)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
};

const addPlayerSchema = Yup.object().shape({
  id: Yup.number().required('ID is required'),

  firstName: Yup.string().required('First name is required'),

  lastName: Yup.string().required('Last name is required'),

  apt: Yup.number()
    .positive('apt number must be a positive number')
    .min(1, 'apt must be a positive number') // Ensures ID is at least 1
    .max(100, 'apt must be at most 100') // Ensures ID does not exceed 100
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
    query: object({
        numberOfPlayers: number()
            .required()
            .positive()
            .integer()
    })
});


module.exports = {
  addPlayerSchema,
  createTeamSchema,selectRandomPlayersSchema,
validate
};
