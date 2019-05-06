import React, { useEffect } from 'react'
import { ProfilesProps, StoreState } from '../../../common/types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles: React.FC<ProfilesProps> = ({ getProfiles, profiles, loading }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'> Browse and connect with developers</i>
          </p>
          <div className='profiles'>
            {profiles && profiles.length > 0 ? (
              profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
            ) : (
              <h4>No Profile Found ...</h4>
            )}
          </div>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: StoreState) => ({
  profiles: state.profile!.profiles,
  loading: state.profile!.loading
})

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles)
