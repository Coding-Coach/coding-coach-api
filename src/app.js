
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer, graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';

import app from './config/express';
import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

export default app;