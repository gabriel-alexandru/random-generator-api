// Node.js Modules.
const express = require('express');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

// Create the app and setup listening on port 3000.
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000);

// --- ROUTES ---

// GET /dice/:faces/:amount route.
app.get('/dice/:faces?/:amount?', (req, res) => {
  let faces = req.params.faces || req.query.faces || 6;
  let amount = req.params.amount || req.query.amount || 1;
  let data = rollDice(faces, amount);
  res.json(data);
});

// GET /people/:gender/:amount
app.get('/people/:gender?/:amount?', (req, res) => {
  let gender = req.params.gender || req.query.gender || 'both';
  let amount = req.params.amount || req.query.amount || 1;
  let data = generatePeople(gender, amount);
  res.json(data);
});

// GET /coin/:amount
app.get('/coin/:amount?', (req, res) => {
  let amount = req.params.amount || req.query.amount || 1;
  let data = flipCoin(amount);
  res.json(data);
});

// GET /rps
app.get('/rps', (req, res) => {
  let roll = rollDice(3, 1).roll;
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

  res.json(data);
});

app.get('/color/:format?', (req, res) => {
  let format = req.params.format || req.query.format || 'hexadecimal';
  let data = getColor(format);
  res.json(data);
});

// --- FUNCTIONS ---

// Function that generates a random color based on the format.
// Return error in case the format is not valid.
function getColor(format) {
  let arr = {
    'ID': 0,
    'timestamp': new Date(Date.now()).toJSON(),
  };

  if (format.match(/^hs[(bl)]?$/i)) {
    // HSL or HSB
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let b = Math.floor(Math.random() * 100);
    arr.color = {
      h,
      s,
      b,
    };
  } else if (format.match(/rgb/i)) {
    // RGB
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    arr.color = {
      r,
      g,
      b,
    };
  } else if (format.match(/cmyk/i)) {
    // CMYK
    let c = Math.floor(Math.random() * 100);
    let m = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 100);
    let k = Math.floor(Math.random() * 100);
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
        Math.floor(Math.random() * 256).toString(16) +
        Math.floor(Math.random() * 256).toString(16) +
        Math.floor(Math.random() * 256).toString(16),
    };
  } else {
    arr = {
      'error': 'Format not valid',
    };
  }

  return arr;
}

// Flip n coins. Return the array containg n Roll objects or, if only 1 flip, the Roll object.
// Return some error in case amount is NaN or is below 0.
function flipCoin(amount) {
  let arr = [];

  switch (isNumber(amount)) {
    case -1:
      return { 'error': 'The amount needs to be a number.' };

    case 0:
      break;

    case 1:
      amount = Number(amount);
      break;
  }

  if (amount <= 0) {
    return { 'error': 'The amount cannot be below 0.' };
  }

  // Generate the coin flips.
  for (let i = 0; i < amount; i++) {
    let side;

    // Choose random wether Head or Tail.
    if (Math.random() < 0.5) {
      side = 'T';
    } else {
      side = 'H';
    }

    // Create the JSON object.
    arr.push({
      'ID': i,
      'timestamp': new Date(Date.now()).toJSON(),
      'flip': side,
    });
  }

  if (arr.length == 1) {
    return arr[0];
  } else if (arr.length > 1) {
    return arr;
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

// Function that read a file.
// If a separator is specified use it to split the content.
function readFile(filePath, separator) {
  if (separator) {
    return fs.readFileSync(filePath, 'utf8').split(separator);
  } else {
    return fs.readFileSync(filePath, 'utf8');
  }
}

// Function that generate n Person object. Return the array or, if only 1 Person, the object.
// Return some error in case the amount is NaN or is below 0.
// Return error if gender is not valid.
function generatePeople(gender, amount) {
  // Read the names and the surnames from the files.
  let surnames = readFile(process.env.ASSETS_PATH + 'surname.txt', '\n');
  let boyNames = readFile(process.env.ASSETS_PATH + 'nameBoy.txt', '\n');
  let girlNames = readFile(process.env.ASSETS_PATH + 'nameGirl.txt', '\n');

  let arr = [];
  switch (isNumber(amount)) {
    case -1:
      return {
        'error': 'The amount needs to be a number.',
      };

    case 0:
      break;

    case 1:
      amount = Number(amount);
      break;
  }

  if (amount <= 0) {
    return { 'error': 'The amount cannot be below 0.' };
  }
  // Generate the people.
  for (let i = 0; i < amount; i++) {
    let name, surname, gen, age;
    if (gender == '' || gender.match(/both/i)) {
      // If gender isn't specified randomly choose between 'm' and 'f'.
      // Choose a random name based on this.
      if (Math.random() < 0.5) {
        name = boyNames[Math.floor(Math.random() * boyNames.length)];
        gen = 'm';
      } else {
        name = girlNames[Math.floor(Math.random() * girlNames.length)];
        gen = 'f';
      }
    } else {
      // If gender is specified check wether it is 'm' or 'f'.
      // Choose a random name based on this.
      if (gender.match(/^m(ale)?$/i)) {
        name = boyNames[Math.floor(Math.random() * boyNames.length)];
        gen = 'm';
      } else if (gender.match(/^f(emale)?$/i)) {
        name = girlNames[Math.floor(Math.random() * girlNames.length)];
        gen = 'f';
      } else {
        return { 'error': 'Gender not valid.' };
      }
    }
    // Choose a random surname.
    surname = surnames[Math.floor(Math.random() * surnames.length)];

    // Choose a random age.
    age = rollDice(100, 1).roll;

    // Create the JSON object.
    arr.push({
      'ID': i,
      'name': name,
      'surname': surname,
      'gender': gen,
      'age': age,
    });
  }

  if (arr.length == 1) {
    return arr[0];
  } else if (arr.length > 1) {
    return arr;
  }
}

// Function that generate n Roll objects. Return the array or, if only 1 Roll, the object.
// Return some error if the number of faces is NaN or is below 0.
// Return some error is the amount is NaN or is below 0.
function rollDice(faces, amount) {
  let arr = [];

  switch (isNumber(faces)) {
    case -1:
      return {
        'error': 'The number of faces needs to be a Number.',
      };

    case 0:
      break;

    case 1:
      faces = Number(faces);
      break;
  }

  switch (isNumber(amount)) {
    case -1:
      return {
        'error': 'The amount needs to be a Number.',
      };

    case 0:
      break;

    case 1:
      amount = Number(amount);
      break;
  }

  if (faces <= 0) {
    return {
      'error': 'The number of faces cannot be below 0.',
    };
  }

  if (amount <= 0) {
    return {
      'error': 'The amount cannot be below 0.',
    };
  }

  // Generate the rolls.
  for (let i = 0; i < amount; i++) {
    // Create the JSON object.
    arr.push({
      'ID': i,
      'timestamp': new Date(Date.now()).toJSON(),
      'roll': Math.round(Math.random() * (faces - 1) + 1),
    });
  }
  if (arr.length == 1) {
    return arr[0];
  } else if (arr.length > 1) {
    return arr;
  }
}
