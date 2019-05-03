import React from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  )
}

export default App
