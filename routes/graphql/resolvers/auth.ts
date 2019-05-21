import { AuthenticationError, UserInputError } from 'apollo-server-core'
import axios from 'axios'
import { IFieldResolver, IResolverObject } from 'graphql-tools'
import { AuthData } from './index'

interface LoginInput {
  email: string
  password: string
}

interface RegisterInput extends LoginInput {
  name: string
}

const REST_ROOT = 'http://localhost:5000'

const login: IFieldResolver<any, AuthData, LoginInput> = async (
  _,
  loginInput
) => {
  try {
    const res = await axios.post(`${REST_ROOT}/api/auth`, loginInput)
    return res.data
  } catch (error) {
    const errors: { msg: string }[] = error.response.data.errors
    return new UserInputError('Authentication Error', { details: errors })
  }
}

const register: IFieldResolver<any, AuthData, RegisterInput> = async (
  _,
  registerInput
) => {
  try {
    const res = await axios.post(`${REST_ROOT}/api/users`, registerInput)
    return res.data
  } catch (error) {
    const errors: { msg: string }[] = error.response.data.errors
    return new UserInputError('Invalid Inputs', { details: errors })
  }
}

const user: IFieldResolver<any, AuthData, null> = async (_, __, auth) => {
  try {
    const res = await axios.get(`${REST_ROOT}/api/auth`, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new AuthenticationError('Unauthenticated Access')
  }
}

const authResolver: { [key: string]: IResolverObject<any, AuthData> } = {
  Query: { login, user },
  Mutation: { register }
}

export default authResolver
