const routes = (app) => {
  app.route('/hello').get((req, res) => {
    res.send('Hello World !!');
  });
};

export default routes;
