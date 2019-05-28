import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Redirect, Route, RouteProps } from 'react-router'
import { AUTH_STATUS } from '../../graphql/gql/auth'
import { AuthStatus } from '../../graphql/types'

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: PrivateComponent,
  ...rest
}) => {
  const { loading, data: auth } = useQuery<AuthStatus, null>(AUTH_STATUS)

  if (loading || !auth || !auth.authStatus) return <></>

  return auth.authStatus.isAuth ? (
    <Route {...rest} render={props => <PrivateComponent {...props} />} />
  ) : (
    <Route {...rest} render={_ => <Redirect to='/login' />} />
  )
}

export default PrivateRoute
