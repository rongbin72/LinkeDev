import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DashboardProps, StoreState } from '../../../common/types'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Dashboard: React.FC<DashboardProps> = ({ getCurrentProfile, user, profile, loading }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])
  return loading && !profile ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {' '}
        <i className='fas fa-user' /> Welcome {user && user.name}{' '}
      </p>
      {profile ? (
        <>has</>
      ) : (
        <>
          <p>You have not yet setup profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: StoreState) => ({
  user: state.auth!.user!,
  profile: state.profile!.profile!,
  loading: state.profile!.loading
})

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
