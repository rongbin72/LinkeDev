import auth from './auth'
import posts from './posts'
import profiles from './profiles'
export interface AuthData {
  token: string
}

const resolvers = {
  Query: { ...auth.Query, ...posts.Query, ...profiles.Query },
  Mutation: { ...auth.Mutation, ...posts.Mutation, ...profiles.Mutation }
}

export default resolvers
