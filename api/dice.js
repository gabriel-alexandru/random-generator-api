const express = require('express');
const router = express.Router();

// GET /dice/:faces/:amount route.
router.get('/:faces?/:amount?', (req, res) => {
  let faces = req.params.faces || req.query.faces || 6;
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

  if (amount >= 1) {
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
    let roll;
    try {
      roll = rollDice(faces);
      roll.ID = i;
    } catch (error) {
      res.status(400);
      res.json({
        'status': 400,
        'error': error,
      });
    }
    if (amount == 1) {
      data = roll;
    } else {
      data.push(roll);
    }
  }
  res.status(200);
  res.json(data);
});

// --- FUNCTIONS ---

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

// Function that generate n Roll objects. Return the array or, if only 1 Roll, the object.
// Return some error if the number of faces is NaN or is below 0.
// Return some error is the amount is NaN or is below 0.
function rollDice(faces) {
  let arr;

  try {
    faces = convertToNumber(faces);
  } catch (error) {
    throw 'The number of faces is not a number';
  }

  if (faces <= 0) {
    throw 'The number of faces must be a positive number greater than 0!';
  }
  // Create the JSON object.
  arr = {
    'timestamp': new Date(Date.now()).toJSON(),
    'roll': random(1, faces),
  };
  return arr;
}

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

module.exports = router;
