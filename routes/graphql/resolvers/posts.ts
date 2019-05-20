import axios from 'axios'
import { AuthData } from '../../../common/types'

const REST_ENDPOINT = 'http://localhost:5000/api/posts'
export default {
  createPost: async (_: any, postData: { text: string }, context: AuthData) => {
    try {
      const res = await axios.post(REST_ENDPOINT, postData, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  posts: async (_: any, __: void, context: AuthData) => {
    try {
      const res = await axios.get(REST_ENDPOINT, {
        headers: {
          'x-auth-token': context.token
        }
      })

      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  post: async (_: any, { id }: { id: string }, context: AuthData) => {
    try {
      const res = await axios.get(`${REST_ENDPOINT}/${id}`, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  deletePost: async (_: any, { id }: { id: string }, context: AuthData) => {
    try {
      const res = await axios.delete(`${REST_ENDPOINT}/${id}`, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  likePost: async (_: any, { id }: { id: string }, context: AuthData) => {
    try {
      const res = await axios.put(`${REST_ENDPOINT}/like/${id}`, null, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  unlikePost: async (_: any, { id }: { id: string }, context: AuthData) => {
    try {
      const res = await axios.delete(`${REST_ENDPOINT}/like/${id}`, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  createComment: async (
    _: any,
    { id, comment }: { id: string; comment: { text: string } },
    context: AuthData
  ) => {
    try {
      const res = await axios.put(`${REST_ENDPOINT}/comment/${id}`, comment, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  deleteComment: async (
    _: any,
    { postID, commentID }: { postID: string; commentID: string },
    context: AuthData
  ) => {
    try {
      const res = await axios.delete(
        `${REST_ENDPOINT}/comment/${postID}/${commentID}`,
        {
          headers: {
            'x-auth-token': context.token
          }
        }
      )
      return res.data
    } catch (error) {
      return new Error(error)
    }
  }
}
