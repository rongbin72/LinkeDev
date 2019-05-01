import mongoose from 'mongoose'
import config from 'config'

const db: string = config.get('mongoURI')

export default async function connectDB() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('MongoDB Connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
