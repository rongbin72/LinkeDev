import { gql } from 'apollo-boost'

const typeDefs = gql`
  type AuthStatus {
    id: ID!
    name: String!
    isAuth: Boolean!
    avatar: String!
  }

  extend type Query {
    authStatus: AuthStatus!
  }

  extend type Mutation {
    updateAuthStatus: Boolean!
  }
`
export default typeDefs
