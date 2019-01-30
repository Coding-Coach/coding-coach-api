import { AuthRouter, LoginRouter } from 'modules/auth';

const routes = (app) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use('/login', LoginRouter);
  }
  app.get('/', (req, res) => res.send('Hello World'));
  app.use('/auth', AuthRouter);
};

export default routes;
