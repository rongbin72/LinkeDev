import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavbarProps, StoreState } from '../../../common/types'
import { logout } from '../../actions/auth'

const Navbar: React.FC<NavbarProps> = ({ isAuth, loading, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <a href='#!'>Developers</a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
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
      {loading ? null : <>{isAuth ? authLinks : guestLinks}</>}
    </nav>
  )
}

const mapStateToProps = (state: StoreState) => ({
  isAuth: state.auth!.isAuth,
  loading: state.auth!.loading
})

export default connect(
  mapStateToProps,
  { logout }
)(Navbar)
