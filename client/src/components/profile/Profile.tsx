import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProfileProps, StoreState } from '../../../common/types'
import { getProfileById } from '../../actions/profile'
import { ProfileStatus } from '../../actions/types'
import store from '../../store'
import Spinner from '../layout/Spinner'
import ProfileAbout from './ProfileAbout'
import ProfileEducation from './ProfileEducation'
import ProfileExperience from './ProfileExperience'
import ProfileGithub from './ProfileGithub'
import ProfileTop from './ProfileTop'

const Profile: React.FC<ProfileProps> = ({ getProfileById, profile, auth, loading, match }) => {
  useEffect(() => {
    getProfileById(match.params.id)
    return () => {
      store.dispatch({ type: ProfileStatus.CLEAR_PROFILE })
    }
  }, [getProfileById, match.params.id])

  return (
    <>
      {!profile || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            {' '}
            Back to Profiles
          </Link>
          {auth && auth.isAuth && !auth.loading && auth.user!._id === profile.user._id && (
            <Link to='/edit_profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}

          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
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

            <div className='profile-edu bg-white p-2'>
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
            {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
          </div>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: StoreState) => ({
  profile: state.profile!.profile,
  auth: state.auth,
  loading: state.profile!.loading
})

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile)
