//the middle ware, yup

//selectPlayers, create, search in order to check if already available
//yup is a validation for nodejs in order to test the type

//some operations as delete need anpther ones, as search if it is exist before deleting it

import { object, string, number } from 'yup';

let players = object({
  firstName: string().required(),
  lastName: string().required(),
  apt: number().required().positive().integer(),
  set_score: number().required().positive().integer(),
  nationalAssociation: string().url().nullable(),
  AVG: number().required().positive().integer(),

});

// parse and assert validity
const user = await players.validate(await fetchUser());

