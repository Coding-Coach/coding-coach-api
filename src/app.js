import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import './logger';
import app from './config/express';
import typeDefs from './schema';
import resolvers from './resolvers';
import './db';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT;
const sslEnabled = process.env.WITH_SSL === 'true';

const configurations = {
  // Note: You may need sudo to run on port 443
  production: {
    ssl: sslEnabled,
    port: sslEnabled ? 443 : 80,
    hostname: process.env.PROD_HOSTNAME,
  },
  development: {
    ssl: sslEnabled,
    port,
    hostname: process.env.DEV_HOSTNAME,
  },
};

const config = configurations[env];
const schema = makeExecutableSchema({ typeDefs, resolvers });

const apollo = new ApolloServer({
  schema,
  introspection: env !== 'production',
  playground: env !== 'production',
});
apollo.applyMiddleware({ app });

let server;

if (config.ssl) {
  const certDir = process.env.CERTS_DIR
    ? path.resolve(process.env.CERTS_DIR)
    : path.resolve(__dirname, 'certs');
  const sslKeyPath = process.env.SSL_KEY_FILENAME
    ? path.resolve(process.env.SSL_KEY_FILENAME)
    : path.resolve(certDir, `${env}.server.key`);
  const sslCertPath = process.env.SSL_CERT_FILENAME
    ? path.resolve(process.env.SSL_CERT_FILENAME)
    : path.resolve(__dirname, `certs/${env}.server.crt`);

  if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
    console.log(`SSL Certificates missing for ${env}. Exiting... `);
    process.exit();
  }

  server = https.createServer(
    {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath),
    },
    app,
  );

  http
    .createServer((req, res) => {
      res.writeHead(301, { Location: `https://${req.headers['host']}${req.url}` });
      res.end();
    })
    .listen(80);
} else {
  server = http.createServer(app);
}

// Add subscription support
apollo.installSubscriptionHandlers(server);

server.listen({ port: config.port }, () => {
  INFO(`Server running in ${env}`);
  INFO(
    `🚀 Server ready at http${config.ssl ? 's' : ''}://${config.hostname}:${server.address().port}${
      apollo.graphqlPath
    }`,
  );
});

export default app;
