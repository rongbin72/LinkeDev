import express from 'express'
import connectDB from './config/db'
import users from './routes/api/users'
import auth from './routes/api/auth'
import profiles from './routes/api/profiles'
import posts from './routes/api/posts'
import path from 'path'

const app = express()

connectDB()

//init Middleware
app.use(express.json())

// Define Routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/profiles', profiles)
app.use('/api/posts', posts)

// Serve static asset for production
if (process.env.NODE_ENV === 'production') {
  // Set static path
  app.use(express.static('client/build'))
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
