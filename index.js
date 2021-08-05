// Node.js Modules.
const express = require('express');
const cors = require('cors');

const coin = require('./api/coin');
const color = require('./api/color');
const dice = require('./api/dice');
const people = require('./api/people');
const place = require('./api/place');
const rps = require('./api/rps');

// Create the app and setup listening on port 3000.
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000);

// --- ROUTES ---
app.get('/', (req, res) => {
  res.redirect(
    'https://github.com/gabriel-alexandru/random-generator-api#readme'
  );
});
app.use('/coin', coin);
app.use('/color', color);
app.use('/dice', dice);
app.use('/people', people);
app.use('/place', place);
app.use('/rps', rps);
