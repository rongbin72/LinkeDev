import React from 'react'
import { PrivateRouteProps, StoreState, DashboardProps } from '../../../common/types'
import { connect } from 'react-redux'
import { Route, Link, Redirect } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuth,
  loading,
  component: PrivateComponent,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (!loading && !isAuth ? <Redirect to='/login' /> : <PrivateComponent />)}
  />
)

const mapStateToProps = (state: StoreState) => ({
  isAuth: state.auth!.isAuth,
  loading: state.auth!.loading
})

export default connect(mapStateToProps)(PrivateRoute)
