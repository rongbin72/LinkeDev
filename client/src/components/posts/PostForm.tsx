import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { toast } from 'react-toastify'
import { CREATE_POST, POSTS } from '../../graphql/gql/post'
import { CreatePost, CreatePostVariables, Posts } from '../../graphql/types'
import showAlert from '../../utils/showAlert'
import moment from 'moment'

const PostForm: React.FC<{
  currentUser: { id: string; name: string; avatar: string }
}> = ({ currentUser }) => {
  const [text, setText] = useState('')
  const client = useApolloClient()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await client.mutate<CreatePost, CreatePostVariables>({
        mutation: CREATE_POST,
        variables: { post: { text } },
        update: proxy => {
          const prevData = proxy.readQuery<Posts>({ query: POSTS })
          prevData &&
            proxy.writeQuery({
              query: POSTS,
              data: {
                posts: [
                  {
                    __typename: 'Post',
                    _id: 'id',
                    user: currentUser.id,
                    name: currentUser.name,
                    avatar: currentUser.avatar,
                    date: moment().toJSON(),
                    text,
                    likes: [],
                    comments: []
                  },
                  ...prevData.posts
                ]
              }
            })
        }
      })
      showAlert('Post Created', toast.TYPE.SUCCESS)
      setText('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>What do you have to say ?</h3>
      </div>
      <form className='form my-1' onSubmit={e => onSubmit(e)}>
        <textarea
          name='text'
          cols={30}
          rows={5}
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

export default PostForm
