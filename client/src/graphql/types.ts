/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Login
// ====================================================

export interface Login_login {
  __typename: "Auth";
  token: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_user {
  __typename: "User";
  _id: string;
  name: string;
  avatar: string;
}

export interface CurrentUser {
  user: CurrentUser_user;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "Auth";
  token: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  name: string;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthStatus
// ====================================================

export interface AuthStatus_authStatus {
  __typename: "AuthStatus";
  isAuth: boolean;
  id: string;
  name: string;
  avatar: string;
}

export interface AuthStatus {
  authStatus: AuthStatus_authStatus;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAuthStatus
// ====================================================

export interface UpdateAuthStatus {
  updateAuthStatus: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_likes {
  __typename: "Like";
  _id: string;
  user: string;
}

export interface Posts_posts_comments {
  __typename: "Comment";
  _id: string;
  text: string;
  date: string;
  name: string;
  avatar: string;
  user: string;
}

export interface Posts_posts {
  __typename: "Post";
  _id: string;
  user: string;
  name: string;
  avatar: string;
  date: string;
  text: string;
  likes: Posts_posts_likes[];
  comments: Posts_posts_comments[];
}

export interface Posts {
  posts: Posts_posts[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_likes {
  __typename: "Like";
  _id: string;
  user: string;
}

export interface Post_post_comments {
  __typename: "Comment";
  _id: string;
  text: string;
  date: string;
  name: string;
  avatar: string;
  user: string;
}

export interface Post_post {
  __typename: "Post";
  _id: string;
  user: string;
  name: string;
  avatar: string;
  date: string;
  text: string;
  likes: Post_post_likes[];
  comments: Post_post_comments[];
}

export interface Post {
  post: Post_post;
}

export interface PostVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost {
  __typename: "Post";
  _id: string;
}

export interface CreatePost {
  createPost: CreatePost_createPost | null;
}

export interface CreatePostVariables {
  post: PostInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePost
// ====================================================

export interface DeletePost_deletePost {
  __typename: "Message";
  msg: string;
}

export interface DeletePost {
  deletePost: DeletePost_deletePost | null;
}

export interface DeletePostVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment {
  __typename: "Comment";
  _id: string;
}

export interface CreateComment {
  createComment: CreateComment_createComment[];
}

export interface CreateCommentVariables {
  id: string;
  comment: CommentInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteComment
// ====================================================

export interface DeleteComment_deleteComment {
  __typename: "Comment";
  _id: string;
}

export interface DeleteComment {
  deleteComment: DeleteComment_deleteComment[];
}

export interface DeleteCommentVariables {
  postID: string;
  commentID: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddLike
// ====================================================

export interface AddLike_likePost {
  __typename: "Like";
  _id: string;
  user: string;
}

export interface AddLike {
  likePost: AddLike_likePost[];
}

export interface AddLikeVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveLike
// ====================================================

export interface RemoveLike_unlikePost {
  __typename: "Like";
  _id: string;
  user: string;
}

export interface RemoveLike {
  unlikePost: RemoveLike_unlikePost[];
}

export interface RemoveLikeVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyProfile
// ====================================================

export interface MyProfile_myProfile_social {
  __typename: "Social";
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  youtube: string | null;
  instagram: string | null;
}

export interface MyProfile_myProfile_experience {
  __typename: "Experience";
  _id: string;
  company: string;
  title: string;
  from: string;
  to: string | null;
  current: boolean | null;
  description: string | null;
}

export interface MyProfile_myProfile_education {
  __typename: "Education";
  _id: string;
  school: string;
  degree: string;
  from: string;
  to: string | null;
  current: boolean | null;
  description: string | null;
}

export interface MyProfile_myProfile {
  __typename: "Profile";
  status: string;
  company: string | null;
  location: string | null;
  website: string | null;
  skills: string[];
  bio: string | null;
  githubusername: string | null;
  social: MyProfile_myProfile_social | null;
  experience: MyProfile_myProfile_experience[];
  education: MyProfile_myProfile_education[];
}

export interface MyProfile {
  myProfile: MyProfile_myProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_profile_social {
  __typename: "Social";
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  youtube: string | null;
  instagram: string | null;
}

export interface Profile_profile_user {
  __typename: "UserInfo";
  _id: string;
  name: string;
  avatar: string;
}

export interface Profile_profile_experience {
  __typename: "Experience";
  _id: string;
  company: string;
  title: string;
  to: string | null;
  from: string;
  current: boolean | null;
  description: string | null;
}

export interface Profile_profile_education {
  __typename: "Education";
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string | null;
  current: boolean | null;
  description: string | null;
}

export interface Profile_profile {
  __typename: "Profile";
  status: string;
  company: string | null;
  location: string | null;
  website: string | null;
  skills: string[];
  bio: string | null;
  githubusername: string | null;
  social: Profile_profile_social | null;
  user: Profile_profile_user;
  experience: Profile_profile_experience[];
  education: Profile_profile_education[];
}

export interface Profile {
  profile: Profile_profile;
}

export interface ProfileVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profiles
// ====================================================

export interface Profiles_profiles_user {
  __typename: "UserInfo";
  _id: string;
  name: string;
  avatar: string;
}

export interface Profiles_profiles {
  __typename: "Profile";
  _id: string;
  user: Profiles_profiles_user;
  status: string;
  company: string | null;
  location: string | null;
  skills: string[];
}

export interface Profiles {
  profiles: Profiles_profiles[];
}

export interface ProfilesVariables {
  offset: number;
  limit: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteExperience
// ====================================================

export interface DeleteExperience_deleteExperience_experience {
  __typename: "Experience";
  _id: string;
}

export interface DeleteExperience_deleteExperience {
  __typename: "Profile";
  experience: DeleteExperience_deleteExperience_experience[];
}

export interface DeleteExperience {
  deleteExperience: DeleteExperience_deleteExperience;
}

export interface DeleteExperienceVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEducation
// ====================================================

export interface DeleteEducation_deleteEducation_education {
  __typename: "Education";
  _id: string;
}

export interface DeleteEducation_deleteEducation {
  __typename: "Profile";
  education: DeleteEducation_deleteEducation_education[];
}

export interface DeleteEducation {
  deleteEducation: DeleteEducation_deleteEducation;
}

export interface DeleteEducationVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAccount
// ====================================================

export interface DeleteAccount_deleteAccount {
  __typename: "Message";
  msg: string;
}

export interface DeleteAccount {
  deleteAccount: DeleteAccount_deleteAccount;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubRepos
// ====================================================

export interface GithubRepos_githubRepos {
  __typename: "GithubRepo";
  id: string;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
}

export interface GithubRepos {
  githubRepos: GithubRepos_githubRepos[];
}

export interface GithubReposVariables {
  userName: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile {
  __typename: "Profile";
  _id: string;
}

export interface UpdateProfile {
  updateProfile: UpdateProfile_updateProfile;
}

export interface UpdateProfileVariables {
  profile: ProfileInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddEducation
// ====================================================

export interface AddEducation_addEducation {
  __typename: "Profile";
  _id: string;
}

export interface AddEducation {
  addEducation: AddEducation_addEducation;
}

export interface AddEducationVariables {
  edu: EduInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddExperience
// ====================================================

export interface AddExperience_addExperience {
  __typename: "Profile";
  _id: string;
}

export interface AddExperience {
  addExperience: AddExperience_addExperience;
}

export interface AddExperienceVariables {
  exp: ExpInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CommentInput {
  text: string;
}

export interface EduInput {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to?: string | null;
  current?: boolean | null;
  description?: string | null;
}

export interface ExpInput {
  title: string;
  company: string;
  location?: string | null;
  from: string;
  current?: boolean | null;
  to?: string | null;
  description?: string | null;
}

export interface PostInput {
  text: string;
}

export interface ProfileInput {
  company?: string | null;
  website?: string | null;
  location?: string | null;
  bio?: string | null;
  status: string;
  githubusername?: string | null;
  skills: string;
  youtube?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
