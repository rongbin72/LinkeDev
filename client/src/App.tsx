import ApolloClient from 'apollo-boost'
import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Routes from './components/routing/Routes'
import { CURRENT_USER } from './graphql/queries/authQuery'
import store from './store'

export const client = new ApolloClient({
  uri: '/graphql',
  request: async op => {
    op.setContext({
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })
  }
})

const App: React.FC = () => {
  useEffect(() => {
    client.query({ query: CURRENT_USER }).catch((error: any) => {
      console.error(error.message)
    })
  }, [])

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    </Provider>
  )
}

export default App
