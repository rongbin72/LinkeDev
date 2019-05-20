import axios from 'axios'
import { Request } from 'express'

const REST_ROOT = 'http://localhost:5000'
export default {
  login: async (_: any, loginData: { email: string; password: string }) => {
    try {
      const res = await axios.post<{ token: string }>(
        `${REST_ROOT}/api/auth`,
        loginData
      )
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  register: async (
    _: any,
    registerData: {
      name: string
      email: string
      password: string
    }
  ) => {
    try {
      const res = await axios.post<{ token: string }>(
        `${REST_ROOT}/api/auth`,
        registerData
      )
      return res.data
    } catch (error) {
      return new Error(error)
    }
  },

  user: async (_: any, __: any, context: { token: string }) => {
    try {
      const res = await axios.get(`${REST_ROOT}/api/auth`, {
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
