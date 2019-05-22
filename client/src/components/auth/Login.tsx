import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'
import { LoginForm } from '../../../common/types'
import { client } from '../../App'
import {
  CURRENT_USER,
  LOGIN,
  LoginResponse,
  UserResponse
} from '../../graphql/queries/authQuery'
import Loading from '../layout/Loading'

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })
  const { email, password } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await client.query<LoginResponse>({
        query: LOGIN,
        variables: { email, password }
      })
      localStorage.setItem('token', res.data.login.token)
      client.resetStore()
    } catch (error) {
      console.error(error.message)
    }
  }

  // Redirect if logged in, else show login page
  return (
    <Query<UserResponse, null> query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />
        // auth fail, show login page
        if (error)
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
                <input
                  type='submit'
                  className='btn btn-primary'
                  value='Login'
                />
              </form>
              <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
              </p>
            </section>
          )
        return <Redirect to='/dashboard' />
      }}
    </Query>
  )
}
export default Login
