import express from 'express'
import Profile from '../../models/Profile'
import auth from '../../middleware/auth'
import User from '../../models/User'
import { AuthRequest, ProfileFields } from '../../common/types'
import { check, validationResult } from 'express-validator/check'

const router = express.Router()

/**
 * @route GET api/profile/me
 * @description Get current user's profile
 * @access Private
 */
router.get('/me', auth, async (req: AuthRequest, res) => {
  try {
    const profile = await Profile.findOne({ userID: req.user!.id }).populate('user', [
      'name, avatar'
    ])
    if (!profile) return res.status(400).json({ msg: 'No profile for this user' })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

/**
 * @route POST api/profile
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

    const userID: string = req.user!.id
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
    const profileFields: ProfileFields = { userID, website }
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) profileFields.skills = skills.split(',').map((skill: string) => skill.trim())

    // Fill social field
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ userID })
      if (profile) {
        profile = await Profile.findOneAndUpdate({ userID }, { $set: profileFields }, { new: true })
        return res.json(profile)
      }

      // Create profile
      profile = new Profile(profileFields)
    } catch (err) {
      console.error(err.message)
      res.status(500).json('Server Error')
    }
  }
)

export default router
