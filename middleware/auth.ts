import config from 'config'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, TokenPayload } from '../common/types'

export default function(req: AuthRequest, res: Response, next: NextFunction) {
  // get token from header
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).json({ msg: 'No token, auth denied' })

  // Verify token
  try {
    const payload = jwt.verify(token, config.get('jwtSecret')) as TokenPayload
    req.user = payload.user
    next()
  } catch (err) {
    return res.status(401).json({ msg: 'Token Invalid' })
  }
}
