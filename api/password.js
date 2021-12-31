const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/:amount?', (req, res) => {
  let amount = req.params.amount || req.query.amount || 1;

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
    let password = generatePassword(
      Number(req.body.length) || 8,
      req.body.symbols,
      req.body.uppercase,
      req.body.numbers
    );
    password.ID = i;
    if (amount == 1) {
      data = password;
    } else {
      data.push(password);
    }
  }
  res.status(200);
  res.json(data);
});

function generatePassword(length, symbolsFlag, uppercaseFlag, numbersFlag) {
  let password = '';

  let letters = 'abcdefghijklmnopqrstuvwxyz';
  let numbers = '0123456789';
  let symbols = '!£$%&/()=?^-.,;:_<>#[]*';
  let completeAlphabeth = letters;

  if (symbolsFlag) {
    completeAlphabeth += symbols;
  }

  if (uppercaseFlag) {
    completeAlphabeth += letters.toUpperCase();
  }

  if (numbersFlag) {
    completeAlphabeth += numbers;
  }

  while (password.length < length) {
    password += completeAlphabeth.charAt(
      Math.floor(Math.random() * completeAlphabeth.length)
    );
  }

  return { 'timestamp': new Date(Date.now()).toJSON(), 'password': password };
}

module.exports = router;
