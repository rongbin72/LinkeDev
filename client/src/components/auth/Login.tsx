import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { LoginProps, StoreState, LoginForm } from '../../../common/types'

const Login: React.FC<LoginProps> = ({ login, isAuth }) => {
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' })
  const { email, password } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(email, password)
    console.log('success')
  }

  // Redirect if logged in, else show login page
  return isAuth ? (
    <Redirect to='/dashboard' />
  ) : (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Sign into Your Account
        </p>
        <form className='form' action='create-profile.html' onSubmit={e => onSubmit(e)}>
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
    </>
  )
}
const mapStateToProps = (state: StoreState) => ({
  isAuth: state.auth!.isAuth
})
export default connect(
  mapStateToProps,
  { login }
)(Login)
