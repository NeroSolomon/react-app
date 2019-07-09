import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './containers/Home.js'
import Test from './containers/Test.js'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/test" component={Test} />
    </Router>
  )
}

export default App
