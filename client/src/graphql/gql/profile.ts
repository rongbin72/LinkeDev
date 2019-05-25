import { gql } from 'apollo-boost'

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      _id
      user {
        name
      }
    }
  }
`

export const PROFILES = gql`
  query Profiles {
    profiles {
      _id
    }
  }
`
