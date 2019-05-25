import { CURRENT_USER } from '../gql/auth'
import { CurrentUser, AuthStatus } from '../types'
import { ApolloClient } from 'apollo-boost'

const resolvers = {
  Mutation: {
    updateAuthStatus: async (_: any, __: any, context: any) => {
      const client = context.client as ApolloClient<any>
      try {
        const res = await client.query<CurrentUser>({
          query: CURRENT_USER,
          fetchPolicy: 'network-only'
        })
        client.writeData<AuthStatus>({
          data: {
            authStatus: {
              __typename: 'AuthStatus',
              isAuth: true,
              id: res.data.user._id,
              name: res.data.user.name,
              avatar: res.data.user.avatar
            }
          }
        })
        return true
      } catch (error) {
        client.writeData<AuthStatus>({
          data: {
            authStatus: {
              __typename: 'AuthStatus',
              isAuth: false,
              id: '',
              name: '',
              avatar: ''
            }
          }
        })
        console.error(error.message)
        return false
      }
    }
  }
}

export default resolvers