import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import express from 'express'
import { importSchema } from 'graphql-import'
import path from 'path'
import connectDB from './config/db'
import forcehttps from './middleware/forcehttps'
import auth from './routes/api/auth'
import posts from './routes/api/posts'
import profiles from './routes/api/profiles'
import users from './routes/api/users'
import resolvers from './routes/graphql/resolvers'

const app = express()

connectDB()

//init Middleware
app.use(express.json())

// Define Routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/profiles', profiles)
app.use('/api/posts', posts)

// GraphQL
const typeDefs = importSchema('./routes/graphql/schema/schema.graphql')
const schema = makeExecutableSchema({ typeDefs, resolvers })
const graphql = new ApolloServer({
  schema,
  context: ({ req }) => ({ token: req.header('x-auth-token') })
})
graphql.applyMiddleware({ app })

// Serve static asset for production
if (process.env.NODE_ENV === 'production') {
  // force https
  app.use(forcehttps)
  // Set static path
  app.use(express.static('client/build'))
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
