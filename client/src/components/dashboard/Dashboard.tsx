import { Button } from '@material-ui/core'
import React from 'react'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { AUTH_STATUS, UPDATE_AUTH_STATUS } from '../../graphql/gql/auth'
import { DELETE_ACCOUNT, MY_PROFILE } from '../../graphql/gql/profile'
import { AuthStatus, MyProfile } from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import Loading from '../layout/Loading'
import DashboardActions from './DashboardActions'
import Education from './Education'
import Experience from './Experience'

const Dashboard: React.FC = () => {
  const client = useApolloClient()
  const { data: auth } = useQuery<AuthStatus, null>(AUTH_STATUS)
  const { loading, error, data: profile } = useQuery<MyProfile, null>(
    MY_PROFILE,
    { fetchPolicy: 'cache-and-network' }
  )

  const deleteAccount = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete you account!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.value) {
        try {
          await client.mutate({ mutation: DELETE_ACCOUNT })
          await client.mutate({ mutation: UPDATE_AUTH_STATUS })
          showAlert(
            'Your account has been permanently deleted',
            toast.TYPE.INFO
          )
          await client.clearStore()
          Swal.fire('Deleted!', 'Your account has been deleted.', 'success')
        } catch (error) {
          console.error(error)
          await client.clearStore()
          showAlert('Something went wrong ?', toast.TYPE.ERROR)
        }
      }
    })
  }
  if (error) {
    showAlert('Something went wrong', toast.TYPE.ERROR)
    console.error(error)
    return null
  }

  return loading || !profile ? (
    <Loading />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        {' '}
        <i className='fas fa-user' /> Welcome{' '}
        {auth && auth.authStatus && auth.authStatus.name}{' '}
      </p>

      {profile.myProfile ? (
        <>
          <DashboardActions />
          <Experience experience={profile.myProfile.experience} />
          <Education education={profile.myProfile.education} />
          <div className='my-2'>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => deleteAccount()}>
              Delete My Account
            </Button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup profile, please add some info</p>
          <Link to='/create_profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  )
}

export default Dashboard
