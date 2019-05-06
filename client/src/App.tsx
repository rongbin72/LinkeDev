import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { loadUser } from './actions/auth'
import './App.css'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Routes from './components/routing/Routes'
import store from './store'
import setAuthToken from './utils/setAuthToken'

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
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  )
}

export default App
