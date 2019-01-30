import passport from 'passport';
import { Strategy as FBStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GitHubStrategy } from 'passport-github2';

import User, { findOrCreateUser } from '../models/user';

let serverURL = `http${process.env.WITH_SSL === 'true' ? 's' : ''}://${process.env.HOSTNAME}`;

if (process.env.PORT !== '80' || process.env.PORT !== '443') {
  serverURL += `:${process.env.PORT}`;
}

const initialize = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Setup use serialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById({ _id: id });
    done(null, user);
  });
  if (process.env.OAUTH_FACEBOOK_CLIENT_ID) {
    passport.use(
      new FBStrategy(
        {
          clientID: process.env.OAUTH_FACEBOOK_CLIENT_ID,
          clientSecret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET,
          callbackURL: `${serverURL}/auth/facebook`,
          profileFields: ['id', 'email', 'displayName'],
        },
        async (accessToken, refreshToken, profile, callback) => {
          const {
            displayName, emails, provider, id,
          } = profile;
          const [firstName, lastName] = displayName.split(' ');
          const email = emails[0].value;
          findOrCreateUser({
            id,
            email,
            firstName,
            lastName,
            provider,
            accessToken,
            refreshToken,
          })
            .then(user => callback(null, user))
            .catch(err => callback(err));
        },
      ),
    );
  } else {
    console.error('Missing FACEBOOK tokens. Please refer OAUTH.md');
  }

  if (process.env.OAUTH_TWITTER_CONSUMER_KEY) {
    passport.use(
      new TwitterStrategy(
        {
          consumerKey: process.env.OAUTH_TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.OAUTH_TWITTER_CONSUMER_SECRET,
          callbackURL: `${serverURL}/auth/twitter`,
          includeEmail: true,
        },
        async (accessToken, refreshToken, profile, callback) => {
          const {
            displayName, emails, provider, id,
          } = profile;
          const [firstName, lastName] = displayName.split(' ');
          const email = emails[0].value;
          findOrCreateUser({
            id,
            email,
            firstName,
            lastName,
            provider,
            accessToken,
            refreshToken,
          })
            .then(user => callback(null, user))
            .catch(err => callback(err));
        },
      ),
    );
  } else {
    console.error('Missing TWITTER tokens. Please refer OAUTH.md');
  }

  if (process.env.OAUTH_GITHUB_CLIENT_ID) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.OAUTH_GITHUB_CLIENT_ID,
          clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
          callbackURL: `${serverURL}/auth/github`,
        },
        (accessToken, refreshToken, profile, callback) => {
          const {
            displayName, emails, provider, id, username,
          } = profile;
          const [firstName, lastName] = displayName.split(' ');
          if (emails) {
            const email = emails[0].value;
            findOrCreateUser({
              id,
              email,
              firstName,
              lastName,
              provider,
              accessToken,
              refreshToken,
              username,
            })
              .then(user => callback(null, user))
              .catch(err => callback(err));
          } else {
            callback({
              message: 'Looks like you have set emails to private.',
              url: 'https://github.com/settings/emails',
            });
          }
        },
      ),
    );
  } else {
    console.error('Missing GITHUB tokens. Please refer OAUTH.md');
  }
};

export default initialize;
