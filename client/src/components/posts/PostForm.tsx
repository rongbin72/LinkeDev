import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PostFormProps } from '../../../common/types'
import { addPost } from '../../actions/post'

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [text, setText] = useState('')
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPost({ text })
    setText('')
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

export default connect(
  null,
  { addPost }
)(PostForm)
