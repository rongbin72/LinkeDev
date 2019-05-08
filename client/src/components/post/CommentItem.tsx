import React from 'react'
import { CommentItemProps, StoreState } from '../../../common/types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem: React.FC<CommentItemProps> = ({
  deleteComment,
  auth,
  comment: { _id, name, user, avatar, date, text },
  post_id
}) => {
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
        {!auth.loading && auth.user && user === auth.user._id && (
          <button
            onClick={e => deleteComment(post_id, _id)}
            type='button'
            className='btn btn-danger'>
            <i className='fas fa-times' />
          </button>
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
  { deleteComment }
)(CommentItem)
