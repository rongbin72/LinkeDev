import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { toast } from 'react-toastify'
import { PROFILES } from '../../graphql/gql/profile'
import { Profiles as TProfiles } from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import Loading from '../layout/Loading'
import ProfileItem from './ProfileItem'
import InfiniteScroll from 'react-infinite-scroller'

const Profiles: React.FC = () => {
  const [hasMoreProfile, setHasMoreProfile] = useState<boolean>(true)
  const { error, loading, data, fetchMore } = useQuery<TProfiles>(PROFILES, {
    variables: {
      offset: 0,
      limit: 3
    }
  })

  if (error) {
    showAlert('Something went wrong', toast.TYPE.ERROR)
    console.error(error)
    return null
  }
  if (loading || !data) return <Loading />

  const fetchMoreProfiles = () =>
    fetchMore({
      variables: { offset: data.profiles.length, limit: 3 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        else if (!fetchMoreResult.profiles.length) {
          setHasMoreProfile(false)
          return prev
        }
        return Object.assign({}, prev, {
          profiles: [...prev.profiles, ...fetchMoreResult.profiles]
        })
      }
    })

  return (
    <>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'>
          {' '}
          Browse and connect with developers
        </i>
      </p>

      {data.profiles.length ? (
        <InfiniteScroll
          initialLoad={false}
          loadMore={fetchMoreProfiles}
          hasMore={hasMoreProfile}
          loader={
            <div className='text-center' key={data.profiles.length}>
              Loading ...
            </div>
          }
        >
          {data.profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </InfiniteScroll>
      ) : (
        <h4>No Profile Found ...</h4>
      )}

      {!hasMoreProfile && <div className='text-center'>You've seen it all</div>}
    </>
  )
}

export default Profiles
