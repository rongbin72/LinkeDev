import axios from 'axios'
import config from 'config'
import express from 'express'
import { check, validationResult } from 'express-validator/check'
import mongoose from 'mongoose'
import {
  AuthRequest,
  Education,
  Experience,
  ProfileType
} from '../../common/types'
import auth from '../../middleware/auth'
import Profile from '../../models/Profile'
import User from '../../models/User'
import Post from '../../models/Post'

const router = express.Router()

/**
 * @route GET api/profiles/me
 * @description Get current user's
 * @access Private
 */
router.get('/me', auth, async (req: AuthRequest, res) => {
  try {
    const user = req.user!.id
    const profile = await Profile.findOne({ user }).populate('user', [
      'name',
      'avatar'
    ])
    if (!profile)
      return res.status(404).json({ msg: 'No profile for this user' })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

/**
 * @route POST api/profiles
 * @description Create or update a user profile
 * @access Private
 */
router.post(
  '/',
  auth,
  [
    check('status', 'status is Required').exists({ checkFalsy: true }),
    check('skills', 'skills is Required').exists({ checkFalsy: true })
  ],
  async (req: AuthRequest, res: express.Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const user = req.user!.id
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body

    // Fill profile field
    const profileFields: ProfileType = { user }
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills)
      profileFields.skills = skills
        .split(',')
        .map((skill: string) => skill.trim())

    // Fill social field
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user })
      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }

      // Create profile
      profile = new Profile(profileFields)
      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err)
      return res.status(500).json('Server Error')
    }
  }
)

/**
 * @route GET api/profiles
 * @description Get all profiles
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    return res.json(profiles)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route GET api/profiles/user/:user_id
 * @description Get profile by user id
 * @access Public
 */
router.get('/user/:user_id', async (req, res) => {
  try {
    const user: string = req.params.user_id
    // check is the input id is valid
    if (!mongoose.Types.ObjectId.isValid(user))
      return res.status(400).json({ msg: 'Profile not Found' })

    const profile = await Profile.findOne({ user }).populate('user', [
      'name',
      'avatar'
    ])

    return profile
      ? res.json(profile)
      : res.status(404).json({ msg: 'Profile not Found' })
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route DELETE api/profiles
 * @description Delete user profile posts
 * @access Private
 */
router.delete('/', auth, async (req: AuthRequest, res) => {
  try {
    const user = req.user!.id
    // Remove User Posts
    await Post.deleteMany({ user })
    // Remove Profile
    await Profile.findOneAndDelete({ user })
    // Remove User
    await User.findOneAndDelete({ _id: user })

    return res.json({ msg: 'User Deleted' })
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route PUT api/profiles/experience
 * @description Add experience to profile
 * @access Private
 */
router.put(
  '/experience',
  auth,
  [
    check('title', 'Title is Required').exists({ checkFalsy: true }),
    check('company', 'Company is Required').exists({ checkFalsy: true }),
    check('from', 'From Date s Required').exists({ checkFalsy: true })
  ],
  async (req: AuthRequest, res: express.Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const user = req.user!.id
    const exp: Experience = req.body
    try {
      const profile = await Profile.findOne({ user })
      if (!profile) return res.status(404).json({ msg: 'Profile not Found' })
      profile.experience!.unshift(exp)
      await profile.save()

      return res.json(profile)
    } catch (err) {
      console.error(err)
      return res.status(500).json('Server Error')
    }
  }
)

/**
 * @route DELETE api/profiles/experience/:exp_id
 * @description Delete experience from profile
 * @access Private
 */
router.delete('/experience/:exp_id', auth, async (req: AuthRequest, res) => {
  const exp_id: string = req.params.exp_id
  const user_id = req.user!.id
  try {
    const profile = await Profile.findOne({ user: user_id })
    if (!profile) return res.status(404).json({ msg: 'Profile not Found' })
    profile.experience = profile.experience!.filter(exp => exp._id != exp_id)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route PUT api/profiles/education
 * @description Add education to profile
 * @access Private
 */
router.put(
  '/education',
  auth,
  [
    check('school', 'School is Required').exists({ checkFalsy: true }),
    check('degree', 'Degree is Required').exists({ checkFalsy: true }),
    check('fieldofstudy', 'Field of Study is Required').exists({
      checkFalsy: true
    }),
    check('from', 'from is Required').exists({ checkFalsy: true })
  ],
  async (req: AuthRequest, res: express.Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    const user = req.user!.id
    const edu: Education = req.body
    try {
      const profile = await Profile.findOne({ user })
      if (!profile) return res.status(404).json({ msg: 'Profile not Found' })
      profile.education!.unshift(edu)
      await profile.save()

      return res.json(profile)
    } catch (err) {
      console.error(err)
      return res.status(500).json('Server Error')
    }
  }
)

/**
 * @route DELETE api/profiles/education/:edu_id
 * @description Delete education from profile
 * @access Private
 */
router.delete('/education/:edu_id', auth, async (req: AuthRequest, res) => {
  const edu_id: string = req.params.edu_id
  const user_id = req.user!.id
  try {
    const profile = await Profile.findOne({ user: user_id })
    if (!profile) return res.status(404).json({ msg: 'Profile not Found' })
    profile.education = profile.education!.filter(edu => edu._id != edu_id)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

/**
 * @route GET api/profiles/github/:username
 * @description Get user repo from profile
 * @access Public
 */
router.get('/github/:username', async (req, res) => {
  const url = `https://api.github.com/users/${
    req.params.username
  }/repos?per_page=5&sort=created:asc&client_id=${config.get(
    'githubClientId'
  )}&client_secret=${config.get('githubSecret')}`
  try {
    const response = await axios.get(url, {
      headers: { 'user-agent': 'node.js' }
    })
    if (response.status != 200)
      return res.status(404).json({ msg: 'Github Profile not Found' })

    return res.json(response.data)
  } catch (err) {
    console.error(err)
    return res.status(500).json('Server Error')
  }
})

export default router
