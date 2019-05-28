import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Link, match } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AUTH_STATUS } from '../../graphql/gql/auth'
import { POST } from '../../graphql/gql/post'
import { AuthStatus, Post as TPost } from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import Loading from '../layout/Loading'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post: React.FC<{ match: match<{ id: string }> }> = ({ match }) => {
  const { loading, error, data } = useQuery<TPost>(POST, {
    variables: { id: match.params.id }
  })

  const { data: auth } = useQuery<AuthStatus>(AUTH_STATUS)

  if (error) {
    showAlert('smt went wrong', toast.TYPE.ERROR)
    console.error(error)
  }

  if (loading || !data || !auth) return <Loading />
  const post = data.post
  const authStatus = auth.authStatus
  return (
    <>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} userID={null} />
      <CommentForm
        postID={post._id}
        currentUser={{
          id: authStatus.id,
          name: authStatus.name,
          avatar: authStatus.avatar
        }}
      />
      {data.post.comments.length ? (
        <h2 className='text-primary'>Comments</h2>
      ) : (
        <h2 className='text-primary'>Be the first to comment</h2>
      )}
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postID={data.post._id}
            userID={auth.authStatus.id}
          />
        ))}
      </div>
    </>
  )
}

export default Post
