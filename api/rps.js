const express = require('express');
const router = express.Router();

// GET /rps
router.get('/', (req, res) => {
  let roll = random(1, 3);
  let data = {
    'ID': 0,
    'timestamp': new Date(Date.now()).toJSON(),
  };
  switch (roll) {
    case 1:
      data.result = 'Rock';
      break;
    case 2:
      data.result = 'Paper';
      break;
    case 3:
      data.result = 'Scissor';
      break;
  }

  res.status(200);
  res.json(data);
});

// --- FUNCTIONS ---

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

module.exports = router;
