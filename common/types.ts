import { Document } from 'mongoose'
import { Request } from 'express'

export interface UserModel extends Document {
  name: string
  email: string
  password: string
  avatar?: string
  date?: string
}

export interface TokenPayload {
  user?: {
    id: string
  }
}
export interface AuthRequest extends Request, TokenPayload {}
