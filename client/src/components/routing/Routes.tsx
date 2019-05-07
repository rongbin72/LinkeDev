import React from 'react'
import { Route, Switch } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import NotFound from '../layout/NotFound'
import Profile from '../profile/Profile'
import Profiles from '../profiles/Profiles'
import AddEducation from '../profile_forms/AddEducation'
import AddExperience from '../profile_forms/AddExperience'
import CreateProfile from '../profile_forms/CreateProfile'
import EditProfile from '../profile_forms/EditProfile'
import PrivateRoute from './PrivateRoute'
import Posts from '../posts/Posts'

const Routes: React.FC = () => {
  return (
    <section className='container'>
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
        <PrivateRoute exact path='/posts' component={Posts} />

        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
    </section>
  )
}

export default Routes
