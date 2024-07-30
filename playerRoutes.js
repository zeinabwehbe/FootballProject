
// module.exports = router;

const express = require('express');
const router = express.Router();
const getConnection = require('./db');
    const connection =  getConnection();

/*
const players = [
    {
      firstName: 'zeinab',
      lastName: 'hasan',
      apt: '13',
      set: '25',
      position: 'defender',
      nationalAssociation: 'scot',
      AVG: 1.5
    },
    {
      firstName: 'mohamad',
      lastName: 'hobal',
      apt: '55',
      set: '75',
      position: 'midfielder',
      nationalAssociation: 'wales',
      AVG: 60.5
    },
    {
      firstName: 'theo',
      lastName: 'safa',
      apt: '23',
      set: '36',
      position: 'midfielder',
      nationalAssociation: 'wales',
      AVG: 35
    },
    {
      firstName: 'jacob',
      lastName: 'mor',
      apt: '91',
      set: '64',
      position: 'defender',
      nationalAssociation: 'xk',
      AVG: 54.5
    },
    {
      firstName: 'arlo',
      lastName: 'ter',
      apt: '4',
      set: '35',
      position: 'attacker',
      nationalAssociation: 'wales',
      AVG: 19.5
    },
    {
      firstName: 'sofia',
      lastName: 'nay',
      apt: '76',
      set: '64',
      position: 'attacker',
      nationalAssociation: 'wales',
      AVG: 34
    },
    {
      firstName: 'ali',
      lastName: 'hasan',
      apt: '40',
      set: '25',
      position: 'attacker',
      nationalAssociation: 'scot',
      AVG: 35
    },
    {
      firstName: 'taylor',
      lastName: 'hassa',
      apt: '38',
      set: '75',
      position: 'midfielder',
      nationalAssociation: 'wales',
      AVG: 60.5
    },
    {
      firstName: 'steven',
      lastName: 'kay',
      apt: '86',
      set: '36',
      position: 'midfielder',
      nationalAssociation: 'wales',
      AVG: 35
    },
    {
      firstName: 'daniel',
      lastName: 'mar',
      apt: '0',
      set: '12',
      position: 'defender',
      nationalAssociation: 'xk',
      AVG: 54.5
    },
    {
      firstName: 'finely',
      lastName: 'bor',
      apt: '63',
      set: '35',
      position: 'attacker',
      nationalAssociation: 'wales',
      AVG: 19.5
    },
    {
      firstName: 'jamess',
      lastName: 'mars',
      apt: '67',
      set: '64',
      position: 'attacker',
      nationalAssociation: 'wales',
      AVG: 34
    }
  ];
*/
// API to gather player info
router.post('/add', async (req, res) => {
  const { firstName, lastName, apt, set_score, position, nationalAssociation } = req.body;
  const AVG = (parseInt(apt) + parseInt(set_score)) / 2;
  const connection = await getConnection();

   await connection.execute(
    'INSERT INTO players (firstName, lastName, apt, set_score, position, nationalAssociation, AVG) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, apt, set_score, position, nationalAssociation, AVG]
  );
  await connection.end();
  res.status(201).send('Player added successfully');

// http://localhost:3000/api/players/add

console.log("Added!")
});
// API to display player info
router.get('/', async (req, res) => {
  const connection = await getConnection();
  const [result] = await connection.execute('Select * from players');
    res.json(result);
  await connection.end();

});
// http://localhost:3000/api/players/

// API to create team
router.post('/create-team', (req, res) => {
  const { numDefenders, numMidfielders, numAttackers } = req.body;
  const totalPlayers = parseInt(numDefenders) + parseInt(numMidfielders) + parseInt(numAttackers);

  if (totalPlayers !== 10) {
    return res.status(400).send('Total number of players must be 10');
  }

  const sortedDefenders = players.filter(player => player.position === "defender").sort((a, b) => b.SET - a.SET).slice(0, numDefenders);
  const sortedMidfielders = players.filter(player => player.position === "midfielder").sort((a, b) => b.SET - a.SET).slice(0, numMidfielders);
  const sortedAttackers = players.filter(player => player.position === "attacker").sort((a, b) => b.SET - a.SET).slice(0, numAttackers);

  const yourTeam = [...sortedDefenders, ...sortedMidfielders, ...sortedAttackers];
  res.json(yourTeam);
});
//http://localhost:3000/api/players/create-team 

// API to select random players
router.get('/random', (req, res) => {
  const { numItems } = req.query;
  const num = parseInt(numItems);

  if (num <= 0 || num > players.length) {
    return res.status(400).send('Invalid number. Please enter a positive integer.');
  }

  const result = [];
  const indices = new Set();

  while (indices.size < num && indices.size < players.length) {
    const randomIndex = Math.floor(Math.random() * players.length);
    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(players[randomIndex]);
    }
  }

  res.json(result);
});
//http://localhost:3000/api/players/random?numItems=5

// API to generate position report
router.get('/position-report', (req, res) => {
  const defendersCount = players.filter(player => player.position === "defender").length;
  const midfieldersCount = players.filter(player => player.position === "midfielder").length;
  const attackersCount = players.filter(player => player.position === "attacker").length;

  const report = {
    defenders: defendersCount,
    midfielders: midfieldersCount,
    attackers: attackersCount
  };

  res.json(report);
});
// http://localhost:3000/api/players/position-report

// API to generate APT report
router.get('/', (req, res) => {
  const sortedPlayers = [...players].sort((a, b) => b.apt - a.apt);
  res.json(sortedPlayers);
});
// http://localhost:3000/api/players/apt-report


// API to find player with highest APT
router.get('/highest-apt', (req, res) => {
  const maxplayer = players.reduce((max, player) => (parseInt(player.apt) > parseInt(max.apt) ? player : max), players[0]);
  res.json(maxplayer);
});
// http://localhost:3000/api/players/highest-apt


   // API to find player with lowest AVG
   router.get('/lowest-avg', (req, res) => {
    const minPlayer = players.reduce((min, player) => (parseInt(player.AVG) < parseInt(min.AVG) ? player : min), players[0]);
    res.json(minPlayer);
  });
// http://localhost:3000/api/players/lowest-avg


  module.exports = router;

