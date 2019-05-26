import React from 'react'
import { Profile_profile } from '../../graphql/types'

interface ProfileAboutProps {
  profile: Profile_profile
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({
  profile: { bio, skills }
}) => (
  <div className='profile-about card bg-light p-2'>
    {bio && (
      <>
        <h2 className='text-primary'>Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </>
    )}
    <h2 className='text-primary'>Skill Set</h2>
    <div className='skills'>
      {skills &&
        skills.map((skill, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-check' /> {skill}
          </div>
        ))}
    </div>
  </div>
)

export default ProfileAbout
