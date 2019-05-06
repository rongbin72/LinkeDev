import React from 'react'
import Alert from '../layout/Alert'
import { Switch, Route } from 'react-router'
import PrivateRoute from './PrivateRoute'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Dashboard from '../dashboard/Dashboard'
import CreateProfile from '../profile_forms/CreateProfile'
import EditProfile from '../profile_forms/EditProfile'
import AddExperience from '../profile_forms/AddExperience'
import AddEducation from '../profile_forms/AddEducation'
import NotFound from '../layout/NotFound'

const Routes: React.FC = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create_profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit_profile' component={EditProfile} />
        <PrivateRoute exact path='/add_experience' component={AddExperience} />
        <PrivateRoute exact path='/add_education' component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
