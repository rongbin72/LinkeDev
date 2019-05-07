import React, { useEffect } from 'react'
import { PostsProps, StoreState } from '../../../common/types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'

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
      {/* <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div> */}
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
