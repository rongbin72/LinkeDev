import express from 'express'
import { check, validationResult } from 'express-validator/check'
import mongoose from 'mongoose'
import { AuthRequest, CommentType } from '../../common/types'
import auth from '../../middleware/auth'
import Post from '../../models/Post'
import User from '../../models/User'

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
      return res.status(404).json({ msg: 'Post not Found' })

    const post = await Post.findById(post_id)
    if (!post) return res.status(404).json({ msg: 'Post not Found' })

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
router.delete('/:post_id', auth, async (req: AuthRequest, res) => {
  const user_id = req.user!.id
  const post_id: string = req.params.post_id
  try {
    // check post_id
    if (!mongoose.Types.ObjectId.isValid(post_id))
      return res.status(404).json({ msg: 'Post not Found' })

    const post = await Post.findById(post_id)
    // check post and whether the post belong to this user
    if (!post) return res.status(404).json({ msg: 'Post not Found' })

    if (post.user.toString() !== user_id) return res.status(401).json({ msg: 'User Unauthorized' })

    await post.remove()
    return res.json({ msg: 'Post Deleted' })
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route PUT api/posts/like/:post_id
 * @description Like a post
 * @access private
 */
router.put('/like/:post_id', auth, async (req: AuthRequest, res) => {
  const post_id: string = req.params.post_id
  const user_id = req.user!.id
  try {
    // check post_id and post existence
    if (!mongoose.Types.ObjectId.isValid(post_id))
      return res.status(404).json({ msg: 'Post not Found' })
    const post = await Post.findById(post_id)
    if (!post) return res.status(404).json({ msg: 'Post not Found' })
    // check if user already liked this post
    if (post.likes!.find(like => like.user.toString() === user_id))
      return res.status(400).json({ msg: 'Post Already Liked' })

    post.likes!.unshift({ user: user_id })
    await post.save()

    return res.json(post.likes)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route DELETE api/posts/like/:post_id
 * @description unlike a post
 * @access private
 */
router.delete('/like/:post_id', auth, async (req: AuthRequest, res) => {
  const post_id: string = req.params.post_id
  const user_id = req.user!.id
  try {
    // check post_id and post existence
    if (!mongoose.Types.ObjectId.isValid(post_id))
      return res.status(404).json({ msg: 'Post not Found' })
    const post = await Post.findById(post_id)
    if (!post) return res.status(404).json({ msg: 'Post not Found' })
    // check if user has not liked this post
    if (!post.likes!.find(like => like.user.toString() === user_id))
      return res.status(400).json({ msg: 'Post has not been liked' })

    post.likes = post.likes!.filter(like => like.user.toString() !== user_id)
    await post.save()

    return res.json(post.likes)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route PUT api/posts/comment/:post_id
 * @description Add a comment to a post
 * @access private
 */
router.put(
  '/comment/:post_id',
  auth,
  [check('text', 'text is Required').exists({ checkFalsy: true })],
  async (req: AuthRequest, res: express.Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json(errors.array())

    const post_id: string = req.params.post_id
    const user_id = req.user!.id
    try {
      const user = await User.findById(user_id).select('-password')
      const post = await Post.findById(post_id)
      if (!post) return res.status(404).json({ msg: 'Post not Found' })
      const comment: CommentType = {
        text: req.body.text,
        name: user!.name,
        avatar: user!.avatar,
        user: user_id
      }
      post.comments!.unshift(comment)
      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err)
      return res.status(500).json('Server Error')
    }
  }
)
/**
 * @route DELETE api/posts/comment/:post_id/:comment_id
 * @description Delete comment from post
 * @access private
 */
router.delete('/comment/:post_id/:comment_id', auth, async (req: AuthRequest, res) => {
  const user_id = req.user!.id
  const comment_id: string = req.params.comment_id
  const post_id: string = req.params.post_id
  try {
    // check post_id
    if (!mongoose.Types.ObjectId.isValid(post_id))
      return res.status(404).json({ msg: 'Post not Found' })

    // check post existence
    const post = await Post.findById(post_id)
    if (!post) return res.status(404).json({ msg: 'Post not Found' })
    // check comment existence
    const comment = post.comments!.find(comment => comment.id! === comment_id)
    if (!comment) return res.status(404).json({ msg: 'Comment not Found' })
    // check if the comment belongs to this user
    if (comment.user.toString() !== user_id)
      return res.status(401).json({ msg: 'User Unauthorized' })

    post.comments = post.comments!.filter(comment => comment.id !== comment_id)

    await post.save()
    return res.json(post.comments)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})
export default router
