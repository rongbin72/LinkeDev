import mongoose, { Schema } from 'mongoose'
import { PostType } from '../common/types'

export default mongoose.model<PostType & mongoose.Document>(
  'post',
  new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    text: { type: String, required: true },
    name: { type: String },
    avatar: { type: String },
    likes: [{ user: { type: Schema.Types.ObjectId, ref: 'user' } }],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        text: { type: String, required: true },
        name: { type: String },
        avatar: { type: String },
        date: { type: Date, default: Date.now }
      }
    ],
    date: { type: Date, default: Date.now }
  })
)
