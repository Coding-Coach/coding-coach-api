import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import MongoDBSession from 'connect-mongodb-session';
import oauthInitialize from './oauth';
import routes from './routes';

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(
  helmet({
    noCache: true,
    frameguard: { action: 'deny' },
  }),
);
app.use(
  morgan(
    '[:date[iso]] :date[web] :remote-addr - :remote-user :method :url :status[pretty] :response-time',
  ),
);
const sessionOptions = {
  resave: true,
  saveUninitialized: true,
  secret: process.env.RANDOM_TOKEN,
};

if (process.env.NODE_ENV === 'production') {
  const database = process.env.NODE_ENV === 'test' ? 'test' : 'coding-coach';
  const dbURI = process.env.MONGO_DB_URI || `mongodb://localhost/${database}`;
  const MongoDBStore = MongoDBSession(session);
  const store = new MongoDBStore({
    uri: dbURI,
    collection: 'app_sessions',
  });
  sessionOptions.store = store;
}

app.use(session(sessionOptions));
app.use(cors());

oauthInitialize(app);

routes(app);

export default app;
