import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
// redux
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile_forms/CreateProfile'
import EditProfile from './components/profile_forms/EditProfile'
import AddExperience from './components/profile_forms/AddExperience'
import AddEducation from './components/profile_forms/AddEducation'

if (localStorage.token) setAuthToken(localStorage.token)

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create_profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit_profile' component={EditProfile} />
              <PrivateRoute exact path='/add_experience' component={AddExperience} />
              <PrivateRoute exact path='/add_education' component={AddEducation} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  )
}

export default App
