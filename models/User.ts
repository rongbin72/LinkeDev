import mongoose from 'mongoose'
import { UserModel } from '../common/types'

const User = mongoose.model<UserModel>(
  'user',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
)

export default User
