import express from 'express'
import connectDB from './config/db'
import users from './routes/api/users'
import auth from './routes/api/auth'
import profiles from './routes/api/profiles'
import posts from './routes/api/posts'

const app = express()

connectDB()

//init Middleware
app.use(express.json())

app.get('/', (_, res) => res.send('API Running'))

// Define Routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/profiles', profiles)
app.use('/api/posts', posts)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
