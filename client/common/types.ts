import { RouteProps, RouteComponentProps, StaticContext } from 'react-router'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AlertStatus, AuthStatus, ProfileStatus } from '../src/actions/types'
import { History } from 'history'
import { createProfile, getCurrentProfile } from '../src/actions/profile'

export interface AuthPayload {
  token?: string | null
  user?: TUser | null
}

export interface AlertPayload {
  msg?: string
  alertType?: string
  id: Readonly<string>
}

export interface ProfilePayload {
  error?: { msg: string; status: number } | null
  profile?: ProfileType | null
}

export type AlertState = AlertPayload[]

export interface AuthState extends AuthPayload {
  isAuth: boolean
  loading: boolean
}

export interface ProfileState extends ProfilePayload {
  profiles: ProfileType[]
  repos: any
  loading: boolean
}

export interface RegisterProps {
  setAlert: SetAlertAction
  register: RegisterAction
  isAuth: boolean
}

export interface AlertProps {
  alerts?: AlertState
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

export type SetAlertAction = (
  msg: string,
  alertType: string,
  timeout?: number
) => ThunkAction<any, States, undefined, Actions>

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

export interface StoreState {
  alert?: AlertState
  auth?: AuthState
  profile?: ProfileState
}

export interface TAction<T, P> extends Action<T> {
  payload: P
}

export type Actions =
  | TAction<AlertStatus, AlertPayload>
  | TAction<AuthStatus, AuthPayload>
  | TAction<ProfileStatus, ProfilePayload>

export type States = AuthState | AlertState | ProfileState

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
  user: string
  company?: string
  website?: string
  location?: string
  status?: string
  skills?: string[]
  bio?: string
  githubusername?: string
  experience?: Experience[]
  education?: Education[]
  social?: Social
  data?: string
}

export interface Experience {
  title: string
  company: string
  location: string
  from: string
  to: string
  current: boolean
  description: string
}

export interface Education {
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
