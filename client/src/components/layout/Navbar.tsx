import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CURRENT_USER, UserResponse } from '../../graphql/queries/authQuery'
import { client } from '../../App'
import { ApolloQueryResult } from 'apollo-boost'

const Navbar: React.FC = () => {
  const logout = async (
    refetch: () => Promise<ApolloQueryResult<UserResponse>>
  ) => {
    localStorage.removeItem('token')
    try {
      await client.clearStore()
      await refetch()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> LinkeDev
        </Link>
      </h1>
      <Query<UserResponse, null> query={CURRENT_USER}>
        {({ loading, error, data, refetch }) => {
          // links before login
          if (error)
            return (
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

          if (loading) return null
          // inks after login
          return (
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
                <Link onClick={e => logout(refetch)} to='/'>
                  <i className='fas fa-sign-out-alt' />{' '}
                  <span className='hide-sm'>Logout</span>
                </Link>
              </li>
            </ul>
          )
        }}
      </Query>
    </nav>
  )
}

export default Navbar
