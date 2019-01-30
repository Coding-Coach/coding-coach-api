import express from 'express';
import passport from 'passport';

import { handleSuccessfulLogin } from './auth';

const AuthRouter = express.Router();
const LoginRouter = express.Router();

if (process.env.OAUTH_FACEBOOK_CLIENT_ID) {
  AuthRouter.get('/facebook', passport.authenticate('facebook'), handleSuccessfulLogin);
  if (process.env.NODE_ENV !== 'production') {
    LoginRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  }
}

if (process.env.OAUTH_TWITTER_CONSUMER_KEY) {
  AuthRouter.get('/twitter', passport.authenticate('twitter'), handleSuccessfulLogin);
  if (process.env.NODE_ENV !== 'production') {
    LoginRouter.get(
      '/twitter',
      passport.authenticate('twitter', { scope: ['include_email=true'] }),
    );
  }
}
if (process.env.OAUTH_GITHUB_CLIENT_ID) {
  AuthRouter.get(
    '/github',
    passport.authenticate('github', { failWithError: true }),
    (err, req, res, next) => {
      if (err) {
        res.send(err);
      } else {
        next(req, res);
      }
    },
    handleSuccessfulLogin,
  );
  if (process.env.NODE_ENV !== 'production') {
    LoginRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
  }
}

export { LoginRouter, AuthRouter };
