const express = require('express');
const router = express.Router();

// GET /color/:format/:amount
router.get('/:format?/:amount?', (req, res) => {
  let format = req.params.format || req.query.format || 'hexadecimal';
  let amount = req.params.amount || req.query.amount || 1;
  let data;

  try {
    amount = convertToNumber(amount);
  } catch (error) {
    res.json({ 'error': 'The amount must be a number!' });
    return;
  }

  if (amount > 1) {
    data = [];
  } else if (amount <= 0) {
    res.json({ 'error': 'The amount must be greater than 0!' });
    return;
  }

  for (let i = 0; i < amount; i++) {
    let color;
    try {
      color = getColor(format);
      color.ID = i;
    } catch (error) {
      res.json({ 'error': 'Format not valid!' });
      return;
    }
    if (amount == 1) {
      data = color;
    } else {
      data.push(color);
    }
  }
  res.json(data);
});

// --- FUNCTIONS ---

// Function that generates a random color based on the format.
// Return error in case the format is not valid.
function getColor(format) {
  let arr = {
    'timestamp': new Date(Date.now()).toJSON(),
  };

  if (format.match(/^hs[(bl)]?$/i)) {
    // HSL or HSB
    let h = random(0, 360);
    let s = random(0, 100);
    let b = random(0, 100);
    arr.color = {
      h,
      s,
      b,
    };
  } else if (format.match(/rgb/i)) {
    // RGB
    let r = random(0, 256);
    let g = random(0, 256);
    let b = random(0, 256);
    arr.color = {
      r,
      g,
      b,
    };
  } else if (format.match(/cmyk/i)) {
    // CMYK
    let c = random(0, 100);
    let m = random(0, 100);
    let y = random(0, 100);
    let k = random(0, 100);
    arr.color = {
      c,
      m,
      y,
      k,
    };
  } else if (format.match(/^(hex)(adecimal)?$/i)) {
    // HEXADECIMAL
    arr.color = {
      'hex':
        '#' +
        random(0, 256).toString(16) +
        random(0, 256).toString(16) +
        random(0, 256).toString(16),
    };
  } else {
    throw Error('Format not valid.');
  }

  return arr;
}

function convertToNumber(value) {
  switch (isNumber(value)) {
    case -1:
      throw Error('Not a number');
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

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

module.exports = router;
