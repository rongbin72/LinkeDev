import { History } from 'history'
import { RouteComponentProps, RouteProps, StaticContext } from 'react-router'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AuthStatus, ProfileStatus } from '../src/actions/types'

export interface AuthPayload {
  token?: string | null
  user?: TUser | null
}

export interface ProfilePayload {
  error?: { msg: string; status: number } | null
  profile?: ProfileType | null
  profiles?: ProfileType[]
  repos?: GithubRepo[]
}

export interface AuthState extends AuthPayload {
  isAuth: boolean
  loading: boolean
}

export interface ProfileState extends ProfilePayload {
  loading: boolean
}

export interface RegisterProps {
  register: RegisterAction
  isAuth: boolean
}

export interface LoginProps {
  login: LoginAction
  isAuth: boolean
}

export interface NavbarProps {
  isAuth: boolean
  loading: boolean
  logout: LogoutAction
}

export interface PrivateRouteProps extends RouteProps {
  loading: boolean
  isAuth: boolean
  component: React.ComponentType<any>
}

export interface DashboardProps {
  getCurrentProfile: GetCurrentProfileAction
  deleteAccount: DeleteAccountAction
  user: TUser | null
  profile: ProfileType | null
  loading: boolean
}

export interface CreateProfileProps extends RouteComponentProps<any, StaticContext, any> {
  createProfile: CreateProfileAction
}

export interface EditProfileProps extends RouteComponentProps<any, StaticContext, any> {
  profile?: ProfileType | null
  loading: boolean
  createProfile: CreateProfileAction
  getCurrentProfile: GetCurrentProfileAction
}

export interface AddExperienceProps extends RouteComponentProps<any, StaticContext, any> {
  addExperience: AddExperienceAction
}

export interface AddEducationProps extends RouteComponentProps<any, StaticContext, any> {
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

export interface ProfileProps extends RouteComponentProps<{ id: string }, StaticContext, any> {
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

export type RegisterAction = (
  name: string,
  email: string,
  password: string
) => ThunkAction<any, States, undefined, Actions>

export type LoadUserAction = () => ThunkAction<any, States, undefined, Actions>

export type LoginAction = (
  email: string,
  password: string
) => ThunkAction<any, States, undefined, Actions>

export type LogoutAction = () => ThunkAction<any, States, undefined, Actions>

export type GetCurrentProfileAction = () => ThunkAction<any, States, undefined, Actions>

export type GetProfilesAction = () => ThunkAction<any, States, undefined, Actions>

export type GetProfileByIdAction = (userId: string) => ThunkAction<any, States, undefined, Actions>

export type GetGithubReposAction = (
  username: string
) => ThunkAction<any, States, undefined, Actions>

export type CreateProfileAction = (
  formData: ProfileForm,
  history: History,
  edit?: boolean
) => ThunkAction<any, States, undefined, Actions>

export type AddExperienceAction = (
  formData: Experience,
  history: History
) => ThunkAction<any, States, undefined, Actions>

export type AddEducationAction = (
  formData: Education,
  history: History
) => ThunkAction<any, States, undefined, Actions>

export type DeleteExperienceAction = (id: string) => ThunkAction<any, States, undefined, Actions>

export type DeleteEducationAction = (id: string) => ThunkAction<any, States, undefined, Actions>

export type DeleteAccountAction = () => ThunkAction<any, States, undefined, Actions>

export interface StoreState {
  auth?: AuthState
  profile?: ProfileState
}

export interface TAction<T, P> extends Action<T> {
  payload: P
}

export type Actions = TAction<AuthStatus, AuthPayload> | TAction<ProfileStatus, ProfilePayload>

export type States = AuthState | ProfileState

export interface ErrorRes {
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
