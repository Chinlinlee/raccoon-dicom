const mongodb = require('./models/mongodb');
const polka = require('polka');
const app = polka();

module.exports.app = app;