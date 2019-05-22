import { History } from 'history'
import { RouteComponentProps, RouteProps, StaticContext } from 'react-router'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AuthStatus, PostStatus, ProfileStatus } from '../src/actions/types'

/**
 * * =======================
 * * | Action Payload Type |
 * * =======================
 */
export type AuthPayload = string | TUser | null

export type ProfilePayload =
  | TError
  | ProfileType
  | ProfileType[]
  | GithubRepo[]
  | null

export type PostPayload =
  | PostType
  | PostType[]
  | TError
  | UpdateLikes
  | string
  | CommentType[]

// TODO Do not extends payload type
/**
 * * ======================
 * * | Reducer State Type |
 * * ======================
 */
export interface AuthState {
  isAuth: boolean
  loading: boolean
  token: string | null
  user: TUser | null
}

export interface ProfileState {
  loading: boolean
  error: TError | null
  profile: ProfileType | null
  profiles: ProfileType[]
  repos: GithubRepo[]
}

export interface PostState {
  loading: boolean
  post: PostType | null
  posts: PostType[]
  error: TError | null
}

/**
 * * ========================
 * * | Component Props Type |
 * * ========================
 */
export interface RegisterProps {
  register: RegisterAction
  isAuth: boolean
}

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

export interface DashboardProps {
  getCurrentProfile: GetCurrentProfileAction
  deleteAccount: DeleteAccountAction
  user: TUser | null
  profile: ProfileType | null
  loading: boolean
}

export interface CreateProfileProps
  extends RouteComponentProps<any, StaticContext, any> {
  createProfile: CreateProfileAction
}

export interface EditProfileProps
  extends RouteComponentProps<any, StaticContext, any> {
  profile?: ProfileType | null
  loading: boolean
  createProfile: CreateProfileAction
  getCurrentProfile: GetCurrentProfileAction
}

export interface AddExperienceProps
  extends RouteComponentProps<any, StaticContext, any> {
  addExperience: AddExperienceAction
}

export interface AddEducationProps
  extends RouteComponentProps<any, StaticContext, any> {
  addEducation: AddEducationAction
}

export interface ExperienceProps {
  experience?: Experience[]
  deleteExperience: DeleteExperienceAction
}

export interface EducationProps {
  education?: Education[]
  deleteEducation: DeleteEducationAction
}

export interface ProfilesProps {
  getProfiles: GetProfilesAction
  profiles?: ProfileType[]
  loading: boolean
}

export interface ProfileItemProps {
  profile: ProfileType
}

export interface ProfileProps
  extends RouteComponentProps<{ id: string }, StaticContext, any> {
  getProfileById: GetProfileByIdAction
  profile?: ProfileType | null
  loading: boolean
  auth?: AuthState
}

export interface ProfileTopProps {
  profile: ProfileType
}

export interface ProfileAboutProps {
  profile: ProfileType
}
export interface ProfileExperienceProps {
  experience: Experience
}

export interface ProfileEducationProps {
  education: Education
}

export interface ProfileGithubProps {
  username: string
  getGithubRepos: GetGithubReposAction
  repos?: GithubRepo[]
}

export interface PostProps
  extends RouteComponentProps<{ id: string }, StaticContext, any> {
  post: PostType | null
  getPost: GetPostAction
  loading: boolean
}

export interface PostsProps {
  getPosts: GetPostsAction
  posts: PostType[]
  loading: boolean
}

export interface PostItemProps {
  post: PostType
  auth: AuthState
  addLike: AddLikeAction
  showActions: boolean
  removeLike: RemoveLikeAction
  deletePost: DeletePostAction
}

export interface PostFormProps {
  addPost: AddPostAction
}

export interface CommentFormProps {
  addComment: AddCommentAction
  post_id: string
}

export interface CommentItemProps {
  deleteComment: DeleteCommentAction
  comment: CommentType
  post_id: string
  auth: AuthState
}

/**
 * * ========================
 * * | Action Function Type |
 * * ========================
 */
export type RegisterAction = (
  name: string,
  email: string,
  password: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type LoadUserAction = () => ThunkAction<
  any,
  StoreState,
  undefined,
  Actions
>

export type LoginAction = (
  email: string,
  password: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type LogoutAction = () => ThunkAction<
  any,
  StoreState,
  undefined,
  Actions
>

export type GetCurrentProfileAction = () => ThunkAction<
  any,
  StoreState,
  undefined,
  Actions
>

export type GetProfilesAction = () => ThunkAction<
  any,
  StoreState,
  undefined,
  Actions
>

export type GetProfileByIdAction = (
  userId: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type GetGithubReposAction = (
  username: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type CreateProfileAction = (
  formData: ProfileForm,
  history: History,
  edit?: boolean
) => ThunkAction<any, StoreState, undefined, Actions>

export type AddExperienceAction = (
  formData: Experience,
  history: History
) => ThunkAction<any, StoreState, undefined, Actions>

export type AddEducationAction = (
  formData: Education,
  history: History
) => ThunkAction<any, StoreState, undefined, Actions>

export type DeleteExperienceAction = (
  id: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type DeleteEducationAction = (
  id: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type DeleteAccountAction = () => ThunkAction<
  any,
  StoreState,
  undefined,
  Actions
>

export type GetPostAction = (
  post_id: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type GetPostsAction = () => ThunkAction<
  any,
  StoreState,
  undefined,
  Actions
>

export type AddLikeAction = (
  post_id: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type RemoveLikeAction = (
  post_id: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type DeletePostAction = (
  post_id: string
) => ThunkAction<any, StoreState, undefined, Actions>

export type AddPostAction = (
  formData: PostForm
) => ThunkAction<any, StoreState, undefined, Actions>

export type AddCommentAction = (
  post_id: string,
  formData: CommentForm
) => ThunkAction<any, StoreState, undefined, Actions>

export type DeleteCommentAction = (
  post_id: string,
  comment_id: string
) => ThunkAction<any, StoreState, undefined, Actions>

/**
 * * ========================
 * * | Top Level Union Type |
 * * ========================
 */
export interface StoreState {
  auth?: AuthState
  profile?: ProfileState
  post?: PostState
}

export interface TAction<T, P> extends Action<T> {
  payload: P
}

export type Actions =
  | TAction<AuthStatus, AuthPayload>
  | TAction<ProfileStatus, ProfilePayload>
  | TAction<PostStatus, PostPayload>

/**
 * * =================
 * * | App Data Type |
 * * =================
 */
export interface ErrorMsg {
  msg: string
}

export interface TError {
  status: number
  msg: string
}

export interface TUser {
  _id: string
  name: string
  email: string
  avatar: string
  date: string
}

export interface ProfileType {
  _id?: string
  user: { _id: string; name: string; avatar: string }
  company?: string
  website?: string
  location?: string
  status?: string
  skills?: string[]
  bio?: string
  githubusername?: string
  experience: Experience[]
  education: Education[]
  social?: Social
  data?: string
}

export interface Experience {
  _id?: string
  title: string
  company: string
  location: string
  from: string
  to: string
  current: boolean
  description: string
}

export interface Education {
  _id?: string
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  current: boolean
  description: string
}

interface Social {
  youtube?: string
  twitter?: string
  facebook?: string
  linkedin?: string
  instagram?: string
}

export interface ProfileForm {
  company: string
  website: string
  location: string
  status: string
  skills: string
  githubusername: string
  bio: string
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  password2: string
}

export interface GithubRepo {
  id: string
  name: string
  html_url: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
}

export interface PostType {
  _id: string
  user: string
  text: string
  name: string
  avatar: string
  likes: LikeType[]
  comments: CommentType[]
  date: string
}

export interface LikeType {
  id: string
  user: string
}

export interface CommentType {
  _id: string
  user: string
  text: string
  name: string
  avatar: string
  date: string
}

export interface UpdateLikes {
  post_id: string
  likes: LikeType[]
}

export interface PostForm {
  text: string
}

export type CommentForm = PostForm
