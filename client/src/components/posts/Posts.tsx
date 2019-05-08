import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { PostsProps, StoreState } from '../../../common/types'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostForm from './PostForm'
import PostItem from './PostItem'

const Posts: React.FC<PostsProps> = ({ getPosts, posts, loading }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return loading ? (
    <Spinner />
  ) : (
    <>
      {' '}
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} showActions={true} post={post} />
        ))}
      </div>
    </>
  )
}

const mapStateToProps = (state: StoreState) => ({
  posts: state.post!.posts,
  loading: state.post!.loading
})

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
