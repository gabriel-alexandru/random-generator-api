const express = require('express');
const router = express.Router();
require('dotenv/config');
const fs = require('fs');

// GET /people/:gender/:amount
router.get('/:gender?/:amount?', (req, res) => {
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
      console.log(error);
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

// --- FUNCTIONS ---

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
  let surnames = readFile('./assets/surname.txt', '\n');
  let boyNames = readFile('./assets/nameBoy.txt', '\n');
  let girlNames = readFile('./assets/nameGirl.txt', '\n');

  let arr;
  // Generate the people.
  let name, surname, gen, age, dateOfBirth;
  if (gender == '' || gender.match(/both/i)) {
    // If gender isn't specified randomly choose between 'm' and 'f'.
    // Choose a random name based on this.
    if (Math.random() < 0.5) {
      name = boyNames[random(0, boyNames.length)];
      gen = 'm';
    } else {
      name = girlNames[random(0, girlNames.length)];
      gen = 'f';
    }
  } else {
    // If gender is specified check wether it is 'm' or 'f'.
    // Choose a random name based on this.
    if (gender.match(/^m(ale)?$/i)) {
      name = boyNames[random(0, boyNames.length)];
      gen = 'm';
    } else if (gender.match(/^f(emale)?$/i)) {
      name = girlNames[random(0, girlNames.length)];
      gen = 'f';
    } else {
      throw Error('Gender not valid');
    }
  }
  // Choose a random surname.
  surname = surnames[random(0, surnames.length)];

  dateOfBirth = generateDate();

  // Choose age based on date of birth.
  age = generateAge(dateOfBirth);

  // Create the JSON object.
  arr = {
    'name': name,
    'surname': surname,
    'gender': gen,
    'age': age,
    'dateOfBirth': dateOfBirth,
  };

  return arr;
}

function generateDate() {
  const todayTimestamp = new Date().getTime();
  const randomDate = new Date(random(0, todayTimestamp));
  let year = randomDate.getFullYear();
  let month = randomDate.getMonth() + 1;
  let day = randomDate.getDate();
  let date = {
    'year': year,
    'month': month,
    'day': day,
  };
  return date;
}

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateAge(date) {
  const today = new Date();
  let age = today.getFullYear() - date.year;
  if (today.getMonth() + 1 < date.month) {
    age--;
  } else if (today.getMonth() + 1 == date.month) {
    if (today.getDate() < date.day) {
      age--;
    }
  }

  return age;
}

module.exports = router;
