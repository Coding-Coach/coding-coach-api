'use strict';

const fetch = require('node-fetch');
const config = require('../../config/constants.js');
const authMiddleware = require('../../middlewares/auth0.js');

// Get an access token for the Auth0 Admin API
function getAdminAccessToken() {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: config.auth0.CLIENT_ID,
      client_secret: config.auth0.CLIENT_SECRET,
      audience: `${config.auth0.DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    }),
  };

  return fetch(`${config.auth0.DOMAIN}/oauth/token`, options)
    .then((response) => response.json());
}


// Get the user's profile from the Admin API
function getUserProfile(accessToken, userID) {
  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
  return fetch(`${config.auth0.DOMAIN}/api/v2/users/${userID}`, options)
    .then(response => response.json());
}

module.exports.list = authMiddleware(async (context, request) => {
  let res = {};
  try {
    const data = await getAdminAccessToken();
    const user = await getUserProfile(data.access_token, request.user.sub);

    res = {
      body: {
        success: true,
        user,
      },
    };
  } catch (error) {
    res = {
      status: 500,
      body: {
        success: false,
        error,
      },
    };
  }

  context.res = {
    ...res,
    headers: {
      'Content-Type': 'application/json'
    },
  };
  context.done()
});
