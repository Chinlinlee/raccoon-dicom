const http = require('http');
const mongodb = require('./models/mongodb');
const polka = require('polka');

const server = http.createServer();
const app = polka({ server });

module.exports.app = app;
module.exports.server = server;