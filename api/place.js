const express = require('express');
const router = express.Router();

// GET /place/:amount
router.get('/:amount?', (req, res) => {
  let amount = req.params.amount || req.query.amount || 1;
  let data;

  try {
    amount = convertToNumber(amount);
  } catch (error) {
    res.status(400);
    res.json({
      'status': 400,
      'error': error,
    });
    return;
  }

  if (amount > 1) {
    data = [];
  } else if (amount <= 0) {
    res.status(400);
    res.json({
      'status': 400,
      'error': 'The amount must be a positive number greater than 0!',
    });
    return;
  }

  for (let i = 0; i < amount; i++) {
    let place = getPlace();
    place.ID = i;
    if (amount == 1) {
      data = place;
    } else {
      data.push(place);
    }
  }
  res.status(200);
  res.json(data);
});

// --- FUNCTIONS ---

// Function that generates a random place.
function getPlace() {
  let arr;

  let lat = parseFloat(Math.random() * 180 - 90).toFixed(6);
  let lon = parseFloat(Math.random() * 360 - 180).toFixed(6);

  arr = {
    'timestamp': new Date(Date.now()).toJSON(),
    lat,
    lon,
  };

  return arr;
}

function convertToNumber(value) {
  switch (isNumber(value)) {
    case -1:
      throw 'The amount is not a number!';
    case 0:
      return value;
    case 1:
      return Number(value);
  }
}

// Function that checks if a variable is a number. Check if a string is a "number" too.
function isNumber(data) {
  if (typeof data == 'number') {
    return 0;
  } else if (data.match(/^[+-]?[0-9]+/)) {
    return 1;
  } else {
    return -1;
  }
}

module.exports = router;
