import { NextFunction, Request, Response } from 'express'

export default function(req: Request, res: Response, next: NextFunction) {
  if (req.headers['x-forwarded-proto'] != 'https')
    return res.redirect(`https://${req.headers.host}${req.url}`)
  next()
}
