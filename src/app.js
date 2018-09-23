import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';

import app from './config/express';
import typeDefs from './schema';
import resolvers from './resolvers';
import './db';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  introspection: env !== 'production',
  playground: env !== 'production',
});
server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server running in ${env}`);
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});

export default app;
