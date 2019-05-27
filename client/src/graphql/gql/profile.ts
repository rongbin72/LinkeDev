import { gql } from 'apollo-boost'

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
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
      experience {
        _id
        company
        title
        from
        to
        current
        description
      }
      education {
        _id
        school
        degree
        from
        to
        current
        description
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
        current
        description
      }
      education {
        _id
        school
        degree
        fieldofstudy
        from
        to
        current
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

export const GITHUB_REPOS = gql`
  query GithubRepos($userName: String!) {
    githubRepos(userName: $userName) {
      id
      name
      html_url
      description
      stargazers_count
      watchers_count
      forks_count
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: ProfileInput) {
    updateProfile(profile: $profile) {
      _id
    }
  }
`

export const ADD_EDUCATION = gql`
  mutation AddEducation($edu: EduInput) {
    addEducation(edu: $edu) {
      _id
    }
  }
`

export const ADD_EXPERIENCE = gql`
  mutation AddExperience($exp: ExpInput) {
    addExperience(exp: $exp) {
      _id
    }
  }
`
