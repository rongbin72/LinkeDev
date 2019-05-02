import express from 'express'
import Profile from '../../models/Profile'
import auth from '../../middleware/auth'
import User from '../../models/User'
import Post from '../../models/Post'
import { check, validationResult } from 'express-validator/check'
import mongoose from 'mongoose'
import { AuthRequest, PostType } from '../../common/types'
import { UV_UDP_REUSEADDR } from 'constants'

const router = express.Router()

/**
 * @route post api/posts
 * @description Create a post
 * @access private
 */
router.post(
  '/',
  auth,
  [check('text', 'text is Required').exists({ checkFalsy: true })],
  async (req: AuthRequest, res: express.Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json(errors.array())

    const user_id: string = req.user!.id
    try {
      const user = await User.findById(user_id).select('-password')
      const post = new Post({
        text: req.body.text,
        name: user!.name,
        avatar: user!.avatar,
        user: user_id
      })
      await post.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json('Server Error')
    }
  }
)

export default router
