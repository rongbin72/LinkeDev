import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { match, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AUTH_STATUS } from '../../graphql/gql/auth'
import { PROFILE } from '../../graphql/gql/profile'
import {
  AuthStatus,
  Profile as TProfile,
  ProfileVariables
} from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import Loading from '../layout/Loading'
import ProfileAbout from './ProfileAbout'
import ProfileEducation from './ProfileEducation'
import ProfileExperience from './ProfileExperience'
import ProfileGithub from './ProfileGithub'
import ProfileTop from './ProfileTop'

const Profile: React.FC<{ match: match<{ id: string }> }> = ({ match }) => {
  const { data: auth } = useQuery<AuthStatus>(AUTH_STATUS)
  const { loading, error, data } = useQuery<TProfile, ProfileVariables>(
    PROFILE,
    {
      variables: { id: match.params.id }
    }
  )

  if (error) {
    if (error.message.includes('404')) return <Redirect to='/404' />
    showAlert('Something went wrong', toast.TYPE.ERROR)
    console.error(error)
    return null
  }

  if (loading || !data) return <Loading />

  const profile = data.profile

  return (
    <>
      <Link to='/profiles' className='btn btn-light'>
        {' '}
        Back to Profiles
      </Link>
      {auth && auth.authStatus && auth.authStatus.id === profile.user._id && (
        <Link to='/edit_profile' className='btn btn-dark'>
          Edit Profile
        </Link>
      )}

      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div className='profile-exp card bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          {profile.experience.length > 0 ? (
            <>
              {profile.experience.map(exp => (
                <ProfileExperience key={exp._id} experience={exp} />
              ))}
            </>
          ) : (
            <h4>No Experience Created</h4>
          )}
        </div>

        <div className='profile-edu card bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          {profile.education.length > 0 ? (
            <>
              {profile.education.map(edu => (
                <ProfileEducation key={edu._id} education={edu} />
              ))}
            </>
          ) : (
            <h4>No Education Created</h4>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub userName={profile.githubusername} />
        )}
      </div>
    </>
  )
}

export default Profile
