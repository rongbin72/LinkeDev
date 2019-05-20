import { buildSchema } from 'graphql'

export default buildSchema(`
  type Like {
    _id: ID!
    user: String!
  }

  type Comment {
    _id?: ID!
    user: String!
    text: String!
    name: String!
    avatar: String!
    date: String!
  }

  type Experience {
    _id: ID!
    title: String!
    company: String!
    location: String
    from: String!
    to: String
    current: Boolean
    description: String
  }

  type Education {
    _id: ID!
    school: String!
    degree: String!
    fieldofstudy: String!
    from: String!
    to: String
    current: Boolean
    description: String
  }

  type Social {
    youtube: String
    twitter: String
    facebook: String
    linkedin: String
    instagramL String
  }
  type Message {
    msg: String!
  }
  type Auth {
    token: String!
  }

  type Post {
    _id: ID!
    user: String!
    text: String!
    name: String!
    avatar: String!
    likes: [Like!]!
    comments: [Comment!]!
    date: String!
  }

  type PostInput {
    text: String!
  }
  
  type CommentInput {
    text: String!
  }

  type ProfileInput {
    company: String
    website: String
    location: String
    bio: String
    status: String!
    githubusername: String
    skills: String!
    youtube: String
    facebook: String
    twitter: String
    instagram: String
    linkedin: String
  }

  type ExpInput {
    title: String!
    company: String!
    location: String
    from: String!
    current: Boolean
    to: String
    description: String
  }

  type EduInput {
    school: String
    degree: String
    fieldofstudy: String
    from: String!
    to: String
    current: Boolean
    description: String
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    avatar: String!
    date: String!
  }

  type UserInfo {
    _id: ID!
    name: String!
    avatar: String!
  }

  type Profile {
    _id: ID!
    user: UserInfo
    company: String
    website: String
    location: String
    status: String!
    skills: [String!]!
    bio: String
    githubusername: String
    experience: [Experience!]!
    education: [Education!]!
    social: Social!
    date: String!
  }


  schema {
    query: RootQuery
    mutation: RootMutation
  }

  type RootQuery {
    post(id: ID!): Post!
    posts: [Post!]!
    userProfile: Profile!
    profile(id: ID!): Profile!
    profiles: [Profile!]!
    login(email: String!, password:String!): Auth!
    user: User!
  }

  type RootMutation {
    register(name: String!, email:String!, password:String!): Auth!
    createPost(post: PostInput): Post
    deletePost(id: ID!): Message
    likePost(id: ID!): [Like!]!
    unlikePost(id: ID!): [Like!]!
    createComment(id: ID!, comment: CommentInput): [Comments!]!
    deleteComment(postID: ID!, commentID: ID!): [Comments!]!
    createProfile(profileInput, ProfileInput): Profile!
    deleteProfile: Message!
    addExperience(exp: ExpInput): Profile!
    deleteExperience(id: ID!): Profile!
    addEducation(edu: EduInput): Profile!
    deleteEducation(id: ID!): Profile!
  }
`)
