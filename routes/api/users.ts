import bcrypt from 'bcryptjs'
import config from 'config'
import express, { Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../../common/types'
import User from '../../models/User'

const router = express.Router()

/**
 * @route POST api/users
 * @description Register User
 * @access Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').exists({ checkFalsy: true }),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 7 or more chars').isLength({ min: 7 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password }: { name: string; email: string; password: string } = req.body
    try {
      let user = await User.findOne({ email })
      // Check user existence
      if (user) return res.status(400).json({ errors: [{ msg: 'User Exists' }] })

      // Get users gravatar
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
      user = new User({ name, email, avatar, password })

      // Encrypt passsword
      const salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      // Return jwt
      const payload: TokenPayload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 72000 }, (err, token) => {
        if (err) throw err
        return res.json({ token })
      })
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

export default router
