import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostProps, StoreState } from '../../../common/types'
import { getPost } from '../../actions/post'
import { PostStatus } from '../../actions/types'
import store from '../../store'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post: React.FC<PostProps> = ({ post, loading, match, getPost }) => {
  useEffect(() => {
    getPost(match.params.id)
    return function() {
      store.dispatch({ type: PostStatus.CLEAR_POST })
    }
  }, [getPost, match.params.id])
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm post_id={post._id} />
      {post.comments.length ? (
        <h2 className='text-primary'>Comments</h2>
      ) : (
        <h2 className='text-primary'>Be the first to comment</h2>
      )}
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} post_id={post._id} />
        ))}
      </div>
    </>
  )
}

const mapStateToProps = (state: StoreState) => ({
  post: state.post!.post,
  loading: state.post!.loading
})

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
