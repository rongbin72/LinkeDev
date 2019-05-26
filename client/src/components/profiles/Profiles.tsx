import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { toast } from 'react-toastify'
import { PROFILES } from '../../graphql/gql/profile'
import { Profiles as TProfiles } from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import Loading from '../layout/Loading'
import ProfileItem from './ProfileItem'

const Profiles: React.FC = () => {
  const { error, loading, data: profiles } = useQuery<TProfiles>(PROFILES)

  if (error) {
    showAlert('Something went wrong', toast.TYPE.ERROR)
    console.error(error)
    return null
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'>
          {' '}
          Browse and connect with developers
        </i>
      </p>
      <div className='profiles'>
        {profiles && profiles.profiles.length > 0 ? (
          profiles.profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No Profile Found ...</h4>
        )}
      </div>
    </>
  )
}

export default Profiles
