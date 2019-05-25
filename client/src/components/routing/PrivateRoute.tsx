import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect, Route } from 'react-router';
import { PrivateRouteProps } from '../../../common/types';
import { AUTH_STATUS } from '../../graphql/gql/auth';
import { AuthStatus } from '../../graphql/types';

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: PrivateComponent,
  ...rest
}) => {
  const { data: auth } = useQuery<AuthStatus, null>(AUTH_STATUS)

  return auth && auth.authStatus && auth.authStatus.isAuth ? (
    <Route {...rest} render={props => <PrivateComponent {...props} />} />
  ) : (
    <Route {...rest} render={_ => <Redirect to='/login' />} />
  )
}

export default PrivateRoute
