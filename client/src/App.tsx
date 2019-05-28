import ApolloClient from 'apollo-boost'
import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Routes from './components/routing/Routes'
import { UPDATE_AUTH_STATUS } from './graphql/gql/auth'
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/schema/schema'

const client = new ApolloClient({
  uri: '/graphql',
  typeDefs,
  resolvers,
  request: async op => {
    op.setContext({
      headers: { 'x-auth-token': localStorage.getItem('token') }
    })
  }
})

const App: React.FC = () => {
  useEffect(() => {
    client.mutate({ mutation: UPDATE_AUTH_STATUS })
  }, [])

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
