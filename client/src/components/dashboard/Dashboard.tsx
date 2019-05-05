import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DashboardProps, StoreState } from '../../../common/types'
import { getCurrentProfile } from '../../actions/profile'

const Dashboard: React.FC<DashboardProps> = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return <>Dashboard</>
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
  profile: state.profile!.profile
})

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard)
