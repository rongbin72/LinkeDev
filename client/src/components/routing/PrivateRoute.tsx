import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PrivateRouteProps } from '../../../common/types'
import { CURRENT_USER, UserResponse } from '../../graphql/queries/authQuery'
import { Query } from 'react-apollo'

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: PrivateComponent,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      props => (
        <Query<UserResponse, null> query={CURRENT_USER}>
          {({ loading, error, data }) => {
            if (error || loading) return <Redirect to='/login' />
            return <PrivateComponent {...props} />
          }}
        </Query>
      )
    }
  />
)

export default PrivateRoute
