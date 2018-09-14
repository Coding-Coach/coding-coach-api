import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'

import app from './config/express'
import typeDefs from './schema'
import resolvers from './resolvers'
import './db'

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000
const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: env !== 'production',
  playground: env !== 'production'
})
server.applyMiddleware({ app })

app.listen({ port: process.env.PORT }, () => {
  console.log('Server running in ' + env)

  if (env !== 'production') {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  } else {
    console.log(`🚀 Server ready at http://localhost`)
  }
})

export default app
