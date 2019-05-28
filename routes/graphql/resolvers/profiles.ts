import axios from 'axios'
import { IFieldResolver, IResolverObject } from 'graphql-tools'
import { AuthData } from '.'
import { UserInputError } from 'apollo-server-core'
import config from 'config'

const REST_ENDPOINT = 'http://localhost:5000/api/profiles'

interface ProfileInput {
  [key: string]: string
}

interface IdQuery {
  id: string
}

const myProfile: IFieldResolver<any, AuthData, null> = async (_, __, auth) => {
  try {
    const res = await axios.get(`${REST_ENDPOINT}/me`, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const updateProfile: IFieldResolver<any, AuthData, ProfileInput> = async (
  _,
  { profile },
  auth
) => {
  try {
    const res = await axios.post(REST_ENDPOINT, profile, {
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

const profiles: IFieldResolver<any, AuthData, null> = async () => {
  try {
    const res = await axios.get('/api/profiles')
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const profile: IFieldResolver<any, AuthData, IdQuery> = async (_, { id }) => {
  try {
    const res = await axios.get(`${REST_ENDPOINT}/user/${id}`)
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const deleteAccount: IFieldResolver<any, AuthData, null> = async (
  _,
  __,
  auth
) => {
  try {
    const res = await axios.delete(REST_ENDPOINT, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const addExperience: IFieldResolver<any, AuthData, ProfileInput> = async (
  _,
  { exp },
  auth
) => {
  try {
    const res = await axios.put(`${REST_ENDPOINT}/experience`, exp, {
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

const deleteExperience: IFieldResolver<any, AuthData, IdQuery> = async (
  _,
  { id },
  auth
) => {
  try {
    const res = await axios.delete(`${REST_ENDPOINT}/experience/${id}`, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const addEducation: IFieldResolver<any, AuthData, ProfileInput> = async (
  _,
  { edu },
  auth
) => {
  try {
    const res = await axios.put(`${REST_ENDPOINT}/education`, edu, {
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

const deleteEducation: IFieldResolver<any, AuthData, IdQuery> = async (
  _,
  { id },
  auth
) => {
  try {
    const res = await axios.delete(`${REST_ENDPOINT}/education/${id}`, {
      headers: {
        'x-auth-token': auth.token
      }
    })
    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const githubRepos: IFieldResolver<any, AuthData, { userName: string }> = async (
  _,
  { userName }
) => {
  const url = `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${config.get(
    'githubClientId'
  )}&client_secret=${config.get('githubSecret')}`
  try {
    const res = await axios.get(url, {
      headers: { 'user-agent': 'node.js' }
    })

    if (res.status != 200) return new Error('Github profile not found')

    return res.data
  } catch (error) {
    return new Error(error)
  }
}

const profileResolver: {
  [key: string]: IResolverObject<any, AuthData, any>
} = {
  Query: { myProfile, profile, profiles, githubRepos },
  Mutation: {
    updateProfile,
    deleteAccount,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation
  }
}
export default profileResolver
