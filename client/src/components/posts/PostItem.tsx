import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  ADD_LIKE,
  DELETE_POST,
  REMOVE_LIKE,
  POSTS
} from '../../graphql/gql/post'
import {
  AddLike,
  AddLikeVariables,
  DeletePost,
  DeletePostVariables,
  Posts_posts,
  RemoveLike,
  RemoveLikeVariables,
  Posts
} from '../../graphql/types'
import showAlert from '../../utils/showAlert'

const PostItem: React.FC<{ post: Posts_posts; userID: string | null }> = ({
  post: { _id: postID, text, name, avatar, user, likes, comments, date },
  userID
}) => {
  const [liked, setLiked] = useState<boolean>(
    likes.find(like => like.user === userID) ? true : false
  )
  const [likeCount, setLikeCount] = useState<number>(likes.length)
  const client = useApolloClient()

  const addLike = async (id: string) => {
    if (liked) showAlert('Post Already Liked', toast.TYPE.ERROR)
    else {
      try {
        setLiked(true)
        setLikeCount(likeCount + 1)
        await client.mutate<AddLike, AddLikeVariables>({
          mutation: ADD_LIKE,
          variables: { id }
        })
      } catch (error) {
        console.error(error)
        window.location.reload()
        showAlert(error.message, toast.TYPE.ERROR)
      }
    }
  }

  const removeLike = async (id: string) => {
    if (!liked) showAlert('Post not Liked', toast.TYPE.ERROR)
    else {
      try {
        setLiked(false)
        setLikeCount(likeCount - 1)
        await client.mutate<RemoveLike, RemoveLikeVariables>({
          mutation: REMOVE_LIKE,
          variables: { id }
        })
      } catch (error) {
        window.location.reload()
        showAlert(error.message, toast.TYPE.ERROR)
      }
    }
  }

  const deletePost = async (id: string) => {
    try {
      await client.mutate<DeletePost, DeletePostVariables>({
        mutation: DELETE_POST,
        variables: { id },
        update: proxy => {
          const prevData = proxy.readQuery<Posts>({ query: POSTS })
          prevData &&
            proxy.writeQuery({
              query: POSTS,
              data: {
                posts: prevData.posts.filter(post => post._id !== id)
              }
            })
        }
      })
      showAlert('Post Deleted', toast.TYPE.SUCCESS)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='post card bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {userID && (
          <>
            <button
              onClick={_ => addLike(postID)}
              type='button'
              className='btn btn-light'>
              {liked ? (
                <i className='fas fa-thumbs-up' />
              ) : (
                <i className='far fa-thumbs-up' />
              )}{' '}
              <span>{likeCount > 0 && <span>{likeCount}</span>}</span>
            </button>
            <button
              onClick={_ => removeLike(postID)}
              type='button'
              className='btn btn-light'>
              <i className='far fa-thumbs-down' />
            </button>
            <Link to={`/post/${postID}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {user === userID && (
              <button
                onClick={_ => deletePost(postID)}
                type='button'
                className='btn btn-danger'>
                <i className='fas fa-times' />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PostItem
