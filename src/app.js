import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'

import app from './config/express'
import typeDefs from './schema'
import resolvers from './resolvers'
import './db'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production'
})
server.applyMiddleware({ app })

app.listen({ port: process.env.PORT }, () => {
  console.log('Server running in ' + process.env.NODE_ENV)

  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  } else {
    console.log(`🚀 Server ready at http://localhost`)
  }
})

export default app
