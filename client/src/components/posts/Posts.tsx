import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { toast } from 'react-toastify'
import { AUTH_STATUS } from '../../graphql/gql/auth'
import { POSTS } from '../../graphql/gql/post'
import { AuthStatus, Posts as TPosts } from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import Loading from '../layout/Loading'
import PostForm from './PostForm'
import PostItem from './PostItem'

const Posts: React.FC = () => {
  const { loading, error, data } = useQuery<TPosts>(POSTS, {
    pollInterval: 1000
  })
  const { data: auth } = useQuery<AuthStatus>(AUTH_STATUS)

  if (error) {
    showAlert('smt wrong', toast.TYPE.ERROR)
    console.error(error)
  }

  if (loading || !data || !auth) return <Loading />

  const currentUser = {
    id: auth.authStatus.id,
    name: auth.authStatus.name,
    avatar: auth.authStatus.avatar
  }

  return (
    <>
      {' '}
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm currentUser={currentUser} />
      <div className='posts'>
        {data.posts.map(post => (
          <PostItem key={post._id} userID={auth.authStatus.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Posts
