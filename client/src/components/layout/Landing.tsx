import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Link, Redirect } from 'react-router-dom'
import { AUTH_STATUS } from '../../graphql/gql/auth'
import { AuthStatus } from '../../graphql/types'

const Landing: React.FC = () => {
  const { data: auth } = useQuery<AuthStatus, null>(AUTH_STATUS)

  return auth && auth.authStatus && auth.authStatus.isAuth ? (
    <Redirect to='/dashboard' />
  ) : (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from
            other developers
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

export default Landing
