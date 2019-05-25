import React, { useState } from 'react'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RegisterForm } from '../../../common/types'
import {
  AUTH_STATUS,
  REGISTER,
  UPDATE_AUTH_STATUS
} from '../../graphql/gql/auth'
import {
  AuthStatus,
  Register as TRegister,
  RegisterVariables
} from '../../graphql/types'
import setAlert from '../../utils/showAlert'
import { FetchResult } from 'apollo-boost'

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData

  const client = useApolloClient()
  const { data: auth } = useQuery<AuthStatus, null>(AUTH_STATUS)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== password2)
      setAlert('Passwords do not match', toast.TYPE.ERROR)
    else {
      try {
        const res: FetchResult<TRegister> = await client.mutate<
          TRegister,
          RegisterVariables
        >({
          mutation: REGISTER,
          variables: { name, email, password },
          errorPolicy: 'all'
        })
        // console.log(res)
        if (res.errors) {
          const error = res.errors[0]
          error.extensions.exception.details.forEach((err: any) =>
            setAlert(err.msg, toast.TYPE.ERROR)
          )
        } else {
          localStorage.setItem('token', res.data.register.token)
          client.mutate({ mutation: UPDATE_AUTH_STATUS })
        }
      } catch (error) {
        // console.log(error)
      }
    }
    // clear after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: ''
    })
  }

  return auth && auth.authStatus && auth.authStatus.isAuth ? (
    <Redirect to='/dashboard' />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={e => register(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            // required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength={7}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            minLength={7}
            // required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </section>
  )
}

export default Register
