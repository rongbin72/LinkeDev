import { gql } from 'apollo-boost'

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
export const CURRENT_USER = gql`
  query currentUser {
    user {
      _id
      name
      avatar
    }
  }
`

export interface LoginResponse {
  login: {
    token: string
  }
}

export interface UserResponse {
  user: {
    _id: string
    name: string
    avatar: string
  }
}
