// Node.js Modules.
const express = require('express');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

console.log('Server starting...');

// Create the app and setup listening on port 3000.
const app = express();
app.use(cors());
app.use(express.json());
app.set('port', 3000);
app.listen(app.get('port'));
console.log('Listening on port: ' + app.get('port'));

// --- ROUTES ---

// GET /dice/:faces/:amount route.
app.get('/dice/:faces?/:amount?', (req, res) => {
  console.log(req.hostname + ' requested: ' + req.path);
  let faces = req.params.faces || req.query.faces || 6;
  let amount = req.params.amount || req.query.amount || 1;
  let data;

  try {
    amount = convertToNumber(amount);
  } catch (error) {
    res.json({ 'error': 'The amount must be a number!' });
    return;
  }

  if (amount >= 1) {
    data = [];
  } else if (amount <= 0) {
    res.json({ 'error': 'The amount must be greater than 0!' });
    return;
  }
  for (let i = 0; i < amount; i++) {
    let roll = rollDice(faces);
    roll.ID = i;
    if (amount == 1) {
      data = roll;
    } else {
      data.push(roll);
    }
  }
  res.json(data);
});

// GET /people/:gender/:amount
app.get('/people/:gender?/:amount?', (req, res) => {
  console.log(req.hostname + ' requested: ' + req.path);
  let gender = req.params.gender || req.query.gender || 'both';
  let amount = req.params.amount || req.query.amount || 1;
  let data;

  try {
    amount = convertToNumber(amount);
  } catch (error) {
    res.json({ 'error': 'The amount must be a number!' });
    return;
  }
  if (amount >= 1) {
    data = [];
  } else if (amount <= 0) {
    res.json({ 'error': 'The amount must be greater than 0!' });
    return;
  }

  for (let i = 0; i < amount; i++) {
    let person;
    try {
      person = generatePeople(gender);
      person.ID = i;
    } catch (error) {
      res.json({ 'error': 'Gender not valid!' });
      return;
    }
    if (amount == 1) {
      data = person;
    } else {
      data.push(person);
    }
  }

  res.json(data);
});

// GET /coin/:amount
app.get('/coin/:amount?', (req, res) => {
  console.log(req.hostname + ' requested: ' + req.path);
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
    let flip = flipCoin();
    flip.ID = i;
    if (amount == 1) {
      data = flip;
    } else {
      data.push(flip);
    }
  }
  res.json(data);
});

// GET /rps
app.get('/rps', (req, res) => {
  console.log(req.hostname + ' requested: ' + req.path);
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

// GET /color/:format/:amount
app.get('/color/:format?/:amount?', (req, res) => {
  console.log(req.hostname + ' requested: ' + req.path);
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

// GET /place/:amount
app.get('/place/:amount?', (req, res) => {
  console.log(req.hostname + ' requested: ' + req.path);
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
    let place = getPlace();
    place.ID = i;
    if (amount == 1) {
      data = place;
    } else {
      data.push(place);
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
    throw Error('Format not valid.');
  }

  return arr;
}

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
      throw Error('Not a number');
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
function generatePeople(gender) {
  // Read the names and the surnames from the files.
  let surnames = readFile(process.env.ASSETS_PATH + 'surname.txt', '\n');
  let boyNames = readFile(process.env.ASSETS_PATH + 'nameBoy.txt', '\n');
  let girlNames = readFile(process.env.ASSETS_PATH + 'nameGirl.txt', '\n');

  let arr;
  // Generate the people.
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
      throw Error('Gender not valid');
    }
  }
  // Choose a random surname.
  surname = surnames[Math.floor(Math.random() * surnames.length)];

  // Choose a random age.
  age = rollDice(100, 1).roll;

  // Create the JSON object.
  arr = {
    'name': name,
    'surname': surname,
    'gender': gen,
    'age': age,
  };

  return arr;
}

// Function that generate n Roll objects. Return the array or, if only 1 Roll, the object.
// Return some error if the number of faces is NaN or is below 0.
// Return some error is the amount is NaN or is below 0.
function rollDice(faces) {
  let arr;

  faces = convertToNumber(faces);

  if (faces <= 0) {
    return {
      'error': 'The number of faces cannot be below 0.',
    };
  }
  // Create the JSON object.
  arr = {
    'timestamp': new Date(Date.now()).toJSON(),
    'roll': Math.round(Math.random() * (faces - 1) + 1),
  };
  return arr;
}
