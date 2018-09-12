// Transpile all code following this line with babel and use 'env' (aka ES6) preset.

require('dotenv').config()
if(process.env.NODE_ENV !== 'production'){
  require('@babel/register')({
    presets: [ '@babel/preset-env', ]
  });
} else {
  process.env.PORT = 80;
}

module.exports = require('./app.js')
