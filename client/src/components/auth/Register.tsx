import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import { RegisterProps, StoreState } from '../../../common/types'

const Register: React.FC<RegisterProps> = ({ setAlert, register, isAuth }) => {
  // TODO define RegisterForm for useState<RegisterForm>
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' })
  const { name, email, password, password2 } = formData

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== password2) setAlert('Passwords do not match', 'danger')
    else register(name, email, password)
    // clear after submission
    setFormData({ ...formData, name: '', email: '', password: '', password2: '' })
  }

  return isAuth ? (
    <Redirect to='/dashboard' />
  ) : (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Create Your Account
        </p>
        <form className='form' action='create-profile.html' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a Gravatar email
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
              required
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
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
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
  { setAlert, register }
)(Register)
