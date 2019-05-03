import bcrypt from 'bcryptjs';
import config from 'config';
import express, { Response } from 'express';
import { check, validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import { AuthRequest, TokenPayload } from '../../common/types';
import auth from '../../middleware/auth';
import User from '../../models/User';

const router = express.Router()

/**
 * @route GET api/auth
 * @description
 * @access Public
 */
router.get('/', auth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

/**
 * @route POST api/auth
 * @description Auth User(login) & get token
 * @access Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is Required').exists()
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password }: { email: string; password: string } = req.body
    try {
      let user = await User.findOne({ email })
      // Check user existence
      if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

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
