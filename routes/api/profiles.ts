import express from 'express'

const router = express.Router()

/**
 * @route GET api/profile
 * @description Test Route
 * @access Public
 */
router.get('/', (req, res) => res.send('PROFILE Route'))

export default router
