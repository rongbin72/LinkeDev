import express from 'express'

const router = express.Router()

/**
 * @route GET api/posts
 * @description Test Route
 * @access Public
 */
router.get('/', (req, res) => res.send('POST Route'))

export default router
