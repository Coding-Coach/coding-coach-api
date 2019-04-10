'use strict';

const authMiddleware = require('../../middlewares/auth0.js');

module.exports.list = authMiddleware((context) => {
  // TODO: get this data from the database
  const users = [{
    id: 1,
    name: 'Emma Wedekind'
  }, {
    id: 2,
    name: 'Crysfel Villa'
  }, {
    id: 3,
    name: 'Mosh Feu'
  }];

  context.res = {
    status: 200,
    body: {
      success: true,
      users,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  context.done();
});
