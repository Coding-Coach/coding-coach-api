'use strict';

/* eslint-disable no-param-reassign */

module.exports.list = function (context) {
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
    body: users,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  context.done();
};
