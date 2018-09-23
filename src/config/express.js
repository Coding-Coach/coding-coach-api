import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

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
app.use(cors());

routes(app);

export default app;
