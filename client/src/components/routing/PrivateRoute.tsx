import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { PrivateRouteProps, StoreState } from '../../../common/types'

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuth,
  loading,
  component: PrivateComponent,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !loading && !isAuth ? <Redirect to='/login' /> : <PrivateComponent {...props} />
    }
  />
)

const mapStateToProps = (state: StoreState) => ({
  isAuth: state.auth!.isAuth,
  loading: state.auth!.loading
})

export default connect(mapStateToProps)(PrivateRoute)
