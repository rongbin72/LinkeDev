import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { StoreState } from '../../../common/types'

const Landing: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
  return isAuth ? (
    <Redirect to='/dashboard' />
  ) : (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from other developers
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state: StoreState) => ({
  isAuth: state.auth!.isAuth
})

export default connect(mapStateToProps)(Landing)
