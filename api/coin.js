const express = require('express');
const router = express.Router();

// GET /coin/:amount
router.get('/:amount?', (req, res) => {
  let amount = req.params.amount || req.query.amount || 1;
  let data;
  try {
    amount = convertToNumber(amount);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({ 'status': 400, 'error': error });
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
    let flip = flipCoin();
    flip.ID = i;
    if (amount == 1) {
      data = flip;
    } else {
      data.push(flip);
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

// Flip n coins. Return the array containg n Roll objects or, if only 1 flip, the Roll object.
// Return some error in case amount is NaN or is below 0.
function flipCoin() {
  let arr;

  let side;

  // Choose random wether Head or Tail.
  if (Math.random() < 0.5) {
    side = 'T';
  } else {
    side = 'H';
  }

  // Create the JSON object.
  arr = {
    'timestamp': new Date(Date.now()).toJSON(),
    'flip': side,
  };

  return arr;
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
