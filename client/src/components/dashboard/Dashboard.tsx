import React from 'react'
import { DashboardProps, StoreState } from '../../../common/types'
import { connect } from 'react-redux'

const Dashboard: React.FC<DashboardProps> = () => {
  return <>Dashboard</>
}

const mapStateToProps = (state: StoreState) => ({})

export default connect(mapStateToProps)(Dashboard)
