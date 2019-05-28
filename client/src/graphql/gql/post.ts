import { gql } from 'apollo-boost'

export const POSTS = gql`
  query Posts {
    posts {
      _id
      user
      name
      avatar
      date
      text
      likes {
        _id
        user
      }
      comments {
        _id
        text
        date
        name
        avatar
        user
      }
    }
  }
`

export const POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      _id
      user
      name
      avatar
      date
      text
      likes {
        _id
        user
      }
      comments {
        _id
        text
        date
        name
        avatar
        user
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post) {
      _id
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      msg
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($id: ID!, $comment: CommentInput!) {
    createComment(id: $id, comment: $comment) {
      _id
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID) {
      _id
    }
  }
`

export const ADD_LIKE = gql`
  mutation AddLike($id: ID!) {
    likePost(id: $id) {
      _id
      user
    }
  }
`

export const REMOVE_LIKE = gql`
  mutation RemoveLike($id: ID!) {
    unlikePost(id: $id) {
      _id
      user
    }
  }
`
