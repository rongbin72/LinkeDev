import axios from 'axios'
import { IFieldResolver, IResolverObject } from 'graphql-tools'
import { AuthData } from '.'
import { UserInputError } from 'apollo-server-core'

interface PostInput {
  post: { text: string }
}

interface CommentInput {
  id: string
  comment: { text: string }
}

interface IdQuery {
  id: string
}

interface DelCommentInput {
  postID: string
  commentID: string
}
const REST_ENDPOINT = `http://localhost:${process.env.PORT || 5000}/api/posts`

const createPost: IFieldResolver<any, AuthData, PostInput> = async (
  _,
  { post },
  auth
) => {
  try {
    const res = await axios.post(REST_ENDPOINT, post, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const posts: IFieldResolver<any, AuthData, null> = async (_, __, auth) => {
  try {
    const res = await axios.get(REST_ENDPOINT, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const post: IFieldResolver<any, AuthData, IdQuery> = async (
  _,
  { id },
  auth
) => {
  try {
    const res = await axios.get(`${REST_ENDPOINT}/${id}`, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const deletePost: IFieldResolver<any, AuthData, IdQuery> = async (
  _,
  { id },
  auth
) => {
  try {
    const res = await axios.delete(`${REST_ENDPOINT}/${id}`, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const likePost: IFieldResolver<any, AuthData, IdQuery> = async (
  _,
  { id },
  auth
) => {
  try {
    const res = await axios.put(`${REST_ENDPOINT}/like/${id}`, null, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    if ((error.response.status as number) === 400) {
      const errorMsg = error.response.data.msg as string
      return new UserInputError(errorMsg)
    }
    return new Error(error)
  }
}

const unlikePost: IFieldResolver<any, AuthData, IdQuery> = async (
  _,
  { id },
  auth
) => {
  try {
    const res = await axios.delete(`${REST_ENDPOINT}/like/${id}`, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    if ((error.response.status as number) === 400) {
      const errorMsg = error.response.data.msg as string
      return new UserInputError(errorMsg)
    }
    return new Error(error)
  }
}

const createComment: IFieldResolver<any, AuthData, CommentInput> = async (
  _,
  { id, comment },
  auth
) => {
  try {
    const res = await axios.put(`${REST_ENDPOINT}/comment/${id}`, comment, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    if ((error.response.status as number) === 400) {
      const errors: { msg: string }[] = error.response.data.errors
      return new UserInputError('Input Error', { details: errors })
    }
    return new Error(error)
  }
}

const deleteComment: IFieldResolver<any, AuthData, DelCommentInput> = async (
  _,
  { postID, commentID },
  auth
) => {
  try {
    const res = await axios.delete(
      `${REST_ENDPOINT}/comment/${postID}/${commentID}`,
      {
        headers: {
          'x-auth-token': auth.token
        }
      }
    )
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const postResolver: { [key: string]: IResolverObject<any, AuthData, any> } = {
  Query: { post, posts },
  Mutation: {
    createPost,
    deletePost,
    likePost,
    unlikePost,
    createComment,
    deleteComment
  }
}
export default postResolver
