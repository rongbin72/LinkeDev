import React, { useState } from 'react'
import { PostItemProps, StoreState } from '../../../common/types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem: React.FC<PostItemProps> = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  showActions,
  post: { _id: post_id, text, name, avatar, user, likes, comments, date }
}) => {
  const [liked, setLiked] = useState<boolean>(false)

  return (
    <div className='post bg-white p-1 my-1'>
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

        {showActions && auth.user && (
          <>
            <button
              onClick={e => {
                addLike(post_id)
                setLiked(true)
              }}
              type='button'
              className='btn btn-light'>
              {liked ? <i className='fas fa-thumbs-up' /> : <i className='far fa-thumbs-up' />}{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={e => {
                removeLike(post_id)
                setLiked(false)
              }}
              type='button'
              className='btn btn-light'>
              <i className='far fa-thumbs-down' />
            </button>
            <Link to={`/post/${post_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button onClick={e => deletePost(post_id)} type='button' className='btn btn-danger'>
                <i className='fas fa-times' />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth!
})

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem)
