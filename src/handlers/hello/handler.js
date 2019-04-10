'use strict';

/* eslint-disable no-param-reassign */

module.exports.hello = function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const content = {
    success: true,
    message: 'Hello extranger!'
  };

  context.res = {
    status: 200,
    body: content,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  context.done();
};
