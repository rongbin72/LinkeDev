import React from 'react'
import { connect } from 'react-redux'
import { AlertProps, StoreState } from '../../../common/types'

const Alert: React.FC<AlertProps> = ({ alerts }) =>
  alerts && alerts.length > 0 ? (
    <>
      {alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </>
  ) : null

const mapStateToProps = (state: StoreState) => ({
  alerts: state.alert
})
export default connect(mapStateToProps)(Alert)
