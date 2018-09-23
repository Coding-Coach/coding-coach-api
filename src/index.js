// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/polyfill');
require('dotenv').config();

module.exports = require('./app.js');
