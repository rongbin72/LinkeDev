import React from 'react'
import { Link } from 'react-router-dom'
import { ProfileItemProps } from '../../../common/types'

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) => {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  } = profile

  return (
    <div className='profile bg-light card'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> @ {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
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
  )
}

export default ProfileItem
