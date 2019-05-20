import axios from 'axios'
import { Request } from 'express'

const REST_ROOT = 'http://localhost:5000'
export default {
  login: async (loginData: { email: string; password: string }) => {
    try {
      const res = await axios.post(`${REST_ROOT}/api/auth`, loginData)
      return res.data
    } catch (error) {
      const errors: { msg: string }[] = error.response.data.errors
      return new Error(errors.map(e => e.msg).join('|'))
    }
  },

  register: async (registerData: {
    name: string
    email: string
    password: string
  }) => {
    try {
      const res = await axios.post(`${REST_ROOT}/api/users`, registerData)
      return res.data
    } catch (error) {
      const errors: { msg: string }[] = error.response.data.errors
      return new Error(errors.map(e => e.msg).join('|'))
    }
  },

  user: async (_: void, req: Request) => {
    try {
      const res = await axios.get(`${REST_ROOT}/api/auth`, {
        headers: {
          'x-auth-token': req.header('x-auth-token')
        }
      })
      return res.data
    } catch (error) {
      return new Error(error)
    }
  }
}
