import { gql } from 'apollo-boost'

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      experience {
        _id
        company
        title
        from
        to
      }
      education {
        _id
        school
        degree
        from
        to
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

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      experience {
        _id
      }
    }
  }
`

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: ID!) {
    deleteEducation(id: $id) {
      education {
        _id
      }
    }
  }
`

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount {
      msg
    }
  }
`
