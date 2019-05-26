import React from 'react'
import Moment from 'react-moment'
import { Profile_profile_experience } from '../../graphql/types'

interface ProfileExperienceProps {
  experience: Profile_profile_experience
}

const ProfileExperience: React.FC<ProfileExperienceProps> = ({
  experience: { company, title, to, from, description }
}) => (
  <div>
    <h3 className='text-dark'>{company}</h3>
    <p>
      <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
      {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
)

export default ProfileExperience
