'use strict';

const authMiddleware = require('../../middlewares/auth0.js');

module.exports.add = authMiddleware((context) => {
  const json = {
    success: true,
    message: 'Succesfully saved'
  };

  context.res = {
    status: 200,
    body: json,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  context.done();
});
