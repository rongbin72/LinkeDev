import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { toast } from 'react-toastify'
import { CREATE_COMMENT, POST } from '../../graphql/gql/post'
import {
  CreateComment,
  CreateCommentVariables,
  Post,
  PostVariables
} from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import moment from 'moment'

const CommentForm: React.FC<{
  postID: string
  currentUser: { id: string; name: string; avatar: string }
}> = ({ postID, currentUser }) => {
  const [text, setText] = useState('')
  const client = useApolloClient()

  const createComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await client.mutate<CreateComment, CreateCommentVariables>({
        mutation: CREATE_COMMENT,
        variables: { id: postID, comment: { text } },
        refetchQueries: [{ query: POST, variables: { id: postID } }],
        update: proxy => {
          const prevData = proxy.readQuery<Post, PostVariables>({
            query: POST,
            variables: { id: postID }
          })
          prevData &&
            proxy.writeQuery<Post, PostVariables>({
              query: POST,
              variables: { id: postID },
              data: {
                post: {
                  ...prevData.post,
                  comments: [
                    {
                      __typename: 'Comment',
                      _id: 'id',
                      name: currentUser.name,
                      avatar: currentUser.avatar,
                      user: currentUser.id,
                      date: moment().toJSON(),
                      text
                    },
                    ...prevData.post.comments
                  ]
                }
              }
            })
        }
      })
      setText('')
      showAlert('Comment Created', toast.TYPE.SUCCESS)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a comment</h3>
      </div>
      <form className='form my-1' onSubmit={createComment}>
        <textarea
          name='text'
          cols={30}
          rows={5}
          placeholder='Create a comment'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

export default CommentForm
