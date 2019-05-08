import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CommentFormProps } from '../../../common/types'
import { addComment } from '../../actions/post'

const CommentForm: React.FC<CommentFormProps> = ({ post_id, addComment }) => {
  const [text, setText] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment(post_id, { text })
    setText('')
  }
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a comment</h3>
      </div>
      <form className='form my-1' onSubmit={e => onSubmit(e)}>
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

export default connect(
  null,
  { addComment }
)(CommentForm)
