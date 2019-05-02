import { Document, Schema } from 'mongoose'
import { Request } from 'express'

export interface UserType extends Document {
  name: string
  email: string
  password: string
  avatar?: string
  date?: string
}

export interface TokenPayload {
  user?: { id: string }
}
export interface AuthRequest extends Request, TokenPayload {}

export interface ProfileType {
  user: string
  company?: string
  website?: string
  location?: string
  status?: string
  skills?: string[]
  bio?: string
  githubusername?: string
  experience?: Experience[]
  education?: Education[]
  social?: Social
  data?: string
}

export interface Experience {
  _id?: string
  title?: string
  company?: string
  location?: string
  from?: string
  to?: string
  current?: string
  description?: string
}

export interface Education {
  _id?: string
  school?: string
  degree?: string
  fieldofstudy?: string
  from?: string
  to?: string
  current?: string
  description?: string
}

interface Social {
  youtube?: string
  twitter?: string
  facebook?: string
  linkedin?: string
  instagram?: string
}

export interface PostType {
  user: string
  text?: string
  name?: string
  avatar?: string
  likes?: LikeType[]
  comments?: CommentType[]
  date?: string
}

interface LikeType {
  user: string
}

interface CommentType {
  user: string
  text: string
  name: string
  avatar: string
  date: string
}
