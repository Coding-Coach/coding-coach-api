const jwt = require('express-jwt');
const config = require('../config/constants.js');

/**
 * We use this middleware to check if the user is authenticated.
 */

const middleware = jwt({
  secret: config.auth0.CERTIFICATE,
  aud: `${config.auth0.DOMAIN}/api/v2/`,
  issuer: `${config.auth0.DOMAIN}/`,
  algorithms: ['RS256'],
});

module.exports = (next) => {
  return (context, req) => {
    middleware(req, null, (err) => {
      if (err) {
        context.res = {
          status: err.status || 500,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            success: false,
            message: err.message,
          },
        };

        return context.done();
      }

      return next(context, req);
    });
  };
};
