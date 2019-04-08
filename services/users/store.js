'use strict';

module.exports.store = function (context) {
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
};
