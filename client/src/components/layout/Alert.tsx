import React from 'react'
import { StoreState, AlertProps, AlertState } from '../../../common/types'
import { connect } from 'react-redux'

const Alert: React.FC<AlertProps> = ({ alerts }) => {
  if (alerts && alert.length > 0)
    return alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
}

const mapStateToProps = (state: StoreState) => ({
  alerts: state.alert
})
export default connect(mapStateToProps)(Alert)
