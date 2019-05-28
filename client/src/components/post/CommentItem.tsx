import React from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DELETE_COMMENT, POST } from '../../graphql/gql/post'
import {
  DeleteComment,
  DeleteCommentVariables,
  Post_post_comments,
  Post,
  PostVariables
} from '../../graphql/types'
import showAlert from '../../utils/showAlert'

const CommentItem: React.FC<{
  comment: Post_post_comments
  postID: string
  userID: string
}> = ({ comment: { _id, name, user, avatar, date, text }, postID, userID }) => {
  const client = useApolloClient()

  const deleteComment = async () => {
    try {
      await client.mutate<DeleteComment, DeleteCommentVariables>({
        mutation: DELETE_COMMENT,
        variables: { postID, commentID: _id },
        refetchQueries: [{ query: POST, variables: { id: postID } }],
        update: proxy => {
          const prevData = proxy.readQuery<Post, PostVariables>({
            query: POST,
            variables: { id: postID }
          })
          prevData &&
            proxy.writeQuery<Post>({
              query: POST,
              variables: { id: postID },
              data: {
                post: {
                  ...prevData.post,
                  comments: prevData.post.comments.filter(
                    comment => comment._id !== _id
                  )
                }
              }
            })
        }
      })
      showAlert('Comment Deleted', toast.TYPE.SUCCESS)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='post bg-white p-1 my-1 card'>
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
        {user === userID && (
          <button
            onClick={_ => deleteComment()}
            type='button'
            className='btn btn-danger'>
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentItem
