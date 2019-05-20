import { AuthData } from '../../../common/types'
import axios from 'axios'

const REST_ENDPOINT = 'http://localhost:5000/api/profiles'

interface ProfileInput {
  [key: string]: string
}

export default {
  myProfile: async (_: any, __: void, context: AuthData) => {
    try {
      const res = await axios.get(`${REST_ENDPOINT}/me`, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  createProfile: async (_: any, profile: ProfileInput, context: AuthData) => {
    try {
      const res = await axios.post(REST_ENDPOINT, profile, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  profiles: async (_: any, __: void) => {
    try {
      const res = await axios.get(REST_ENDPOINT)
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  profile: async (_: any, { id }: { id: string }) => {
    try {
      const res = await axios.get(`${REST_ENDPOINT}/user/${id}`)
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  deleteAccount: async (_: any, __: void, context: AuthData) => {
    try {
      const res = await axios.delete(REST_ENDPOINT, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  addExperience: async (
    _: any,
    { exp }: { exp: ProfileInput },
    context: AuthData
  ) => {
    try {
      const res = await axios.put(`${REST_ENDPOINT}/experience`, exp, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  deleteExperience: async (
    _: any,
    { id }: { id: string },
    context: AuthData
  ) => {
    try {
      const res = await axios.delete(`${REST_ENDPOINT}/experience/${id}`, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  addEducation: async (
    _: any,
    { edu }: { edu: ProfileInput },
    context: AuthData
  ) => {
    try {
      const res = await axios.put(`${REST_ENDPOINT}/education`, edu, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  deleteEducation: async (
    _: any,
    { id }: { id: string },
    context: AuthData
  ) => {
    try {
      const res = await axios.delete(`${REST_ENDPOINT}/education/${id}`, {
        headers: {
          'x-auth-token': context.token
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  }
}
