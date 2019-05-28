import React, { useState } from 'react'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import { Link, Redirect } from 'react-router-dom'
import { AUTH_STATUS, LOGIN, UPDATE_AUTH_STATUS } from '../../graphql/gql/auth'
import {
  AuthStatus,
  Login as TLogin,
  LoginVariables,
  UpdateAuthStatus
} from '../../graphql/types'
import Loading from '../layout/Loading'

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginVariables>({
    email: '',
    password: ''
  })
  const { email, password } = formData

  const client = useApolloClient()

  const { loading, error, data } = useQuery<AuthStatus, null>(AUTH_STATUS)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // get token through login mutation
      const res = await client.query<TLogin, LoginVariables>({
        query: LOGIN,
        variables: { email, password }
      })
      // set token, update AuthStatus
      localStorage.setItem('token', res.data.login.token)
      client.mutate<UpdateAuthStatus, null>({ mutation: UPDATE_AUTH_STATUS })
    } catch (error) {
      console.error(error)
    }
  }

  if (error) return <>{'Something went wrong'}</>
  if (loading) return <Loading />
  if (data && data.authStatus && data.authStatus.isAuth)
    return <Redirect to='/dashboard' />

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign into Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={e => login(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength={6}
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  )
}
export default Login
