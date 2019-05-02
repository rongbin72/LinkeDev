import express from 'express'
import Profile from '../../models/Profile'
import auth from '../../middleware/auth'
import User from '../../models/User'
import Post from '../../models/Post'
import { check, validationResult } from 'express-validator/check'
import mongoose from 'mongoose'
import { AuthRequest, PostType } from '../../common/types'
import { UV_UDP_REUSEADDR } from 'constants'
import { posix } from 'path'

const router = express.Router()

/**
 * @route POST api/posts
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

    const user_id = req.user!.id
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
      console.error(err)
      return res.status(500).json('Server Error')
    }
  }
)

/**
 * @route GET api/posts
 * @description Get all posts
 * @access private
 */
router.get('/', auth, async (_, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    return res.json(posts)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route GET api/posts/:post_id
 * @description Get post by id
 * @access private
 */
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post_id: string = req.params.post_id
    if (!mongoose.Types.ObjectId.isValid(post_id))
      return res.status(500).json({ msg: 'post not Found' })

    const post = await Post.findById(post_id)
    if (!post) return res.status(500).json({ msg: 'post not Found' })

    return res.json(post)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route DELETE api/posts/:post_id
 * @description Delete post by id
 * @access private
 */
router.get('/:post_id', auth, async (req: AuthRequest, res) => {
  const user_id = req.user!.id
  const post_id: string = req.params.post_id
  try {
    if (!mongoose.Types.ObjectId.isValid(post_id))
      return res.status(500).json({ msg: 'post not Found' })

    const post = await Post.findById(post_id)
    if (!post) return res.status(500).json({ msg: 'post not Found' })
    if (post.user !== user_id) return res.status(401).json({ msg: 'User Unauthorized' })

    return res.json({ msg: 'post deleted' })
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

export default router
