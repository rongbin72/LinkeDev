import React from 'react'
import { Link } from 'react-router-dom'
import { Profiles_profiles } from '../../graphql/types'

interface ProfileItemProps {
  profile: Profiles_profiles
}

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) => {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  } = profile

  return (
    <Link to={`/profile/${_id}`}>
      <div className='profile bg-light card'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span> @ {company}</span>}
          </p>
          <p className='my-1'>{location && <span>{location}</span>}</p>
        </div>
        <ul>
          {skills &&
            skills.slice(0, 4).map((skill, index) => (
              <li key={index} className='text-primary'>
                <i className='fas fa-check' /> {skill}
              </li>
            ))}
        </ul>
      </div>
    </Link>
  )
}

export default ProfileItem
