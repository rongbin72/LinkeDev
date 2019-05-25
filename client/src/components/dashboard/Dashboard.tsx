import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { AUTH_STATUS } from '../../graphql/gql/auth'
import { MY_PROFILE } from '../../graphql/gql/profile'
import { AuthStatus, MyProfile } from '../../graphql/types'
import Loading from '../layout/Loading'

const Dashboard: React.FC = () => {
  const { error, data: auth } = useQuery<AuthStatus, null>(AUTH_STATUS)
  const { loading, data: profile } = useQuery<MyProfile, null>(MY_PROFILE)

  return loading && !profile ? (
    <Loading />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {' '}
        <i className='fas fa-user' /> Welcome {auth && auth.authStatus.name}{' '}
      </p>

      {/* {profile ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup profile, please add some info</p>
          <Link to='/create_profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )} */}
    </>
  )
}

export default Dashboard
