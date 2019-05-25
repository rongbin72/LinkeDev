import { gql } from 'apollo-boost'

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const CURRENT_USER = gql`
  query CurrentUser {
    user {
      _id
      name
      avatar
    }
  }
`

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
    }
  }
`

export const AUTH_STATUS = gql`
  query AuthStatus {
    authStatus @client {
      isAuth
      id
      name
      avatar
    }
  }
`
export const UPDATE_AUTH_STATUS = gql`
  mutation UpdateAuthStatus {
    updateAuthStatus @client
  }
`
