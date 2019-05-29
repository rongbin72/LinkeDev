import { MyProfile_myProfile, ProfileInput } from '../graphql/types'

export default function(profile: ProfileInput): MyProfile_myProfile {
  return {
    __typename: 'Profile',
    status,
    skills: profile.skills.split(','),
    company: profile.company || null,
    location: profile.location || null,
    website: profile.website || null,
    bio: profile.bio || null,
    githubusername: profile.githubusername || null,
    social:
      profile.youtube ||
      profile.linkedin ||
      profile.twitter ||
      profile.instagram
        ? {
            __typename: 'Social',
            facebook: profile.facebook || null,
            twitter: profile.twitter || null,
            linkedin: profile.linkedin || null,
            youtube: profile.youtube || null,
            instagram: profile.instagram || null
          }
        : null,
    experience: [],
    education: []
  }
}
