import React from 'react'
import { StoreState } from '../../../common/types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const DashboardActions: React.FC = () => {
  return (
    <>
      <div className='dash-buttons'>
        <Link to='/edit_profile' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary' /> Edit Profile
        </Link>
        <Link to='/add_experience' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary' /> Add Experience
        </Link>
        <Link to='/add_education' className='btn btn-light'>
          <i className='fas fa-graduation-cap text-primary' /> Add Education
        </Link>
      </div>
    </>
  )
}

const mapStateToProps = (state: StoreState) => ({})

export default connect(mapStateToProps)(DashboardActions)
