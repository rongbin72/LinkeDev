import React from 'react'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import { Link } from 'react-router-dom'
import { AUTH_STATUS, UPDATE_AUTH_STATUS } from '../../graphql/gql/auth'
import { AuthStatus } from '../../graphql/types'

const Navbar: React.FC = () => {
  const { data: auth } = useQuery<AuthStatus, null>(AUTH_STATUS)
  const client = useApolloClient()

  const logout = async () => {
    localStorage.removeItem('token')
    try {
      await client.mutate({ mutation: UPDATE_AUTH_STATUS })
      client.clearStore()
    } catch (error) {
      console.error(error.message)
    }
  }

  const guestLinks = (
    <ul>
      <li>
        {' '}
        <Link to='/profiles'>Developers</Link>{' '}
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  )

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fab fa-connectdevelop' />{' '}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> LinkeDev
        </Link>
      </h1>
      {auth && auth.authStatus && auth.authStatus.isAuth
        ? authLinks
        : guestLinks}
    </nav>
  )
}

export default Navbar
