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

export const PROFILE = gql`
  query Profile($id: ID!) {
    profile(id: $id) {
      status
      company
      location
      website
      skills
      bio
      githubusername
      social {
        facebook
        twitter
        linkedin
        youtube
        instagram
      }
      user {
        _id
        name
        avatar
      }
      experience {
        _id
        company
        title
        to
        from
        description
      }
      education {
        _id
        school
        degree
        fieldofstudy
        from
        to
        description
      }
    }
  }
`

export const PROFILES = gql`
  query Profiles {
    profiles {
      _id
      user {
        _id
        name
        avatar
      }
      status
      company
      location
      skills
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
