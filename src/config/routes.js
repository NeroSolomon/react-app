import React from 'react'
import { Route } from 'react-router-dom'
import Home from './../containers/Home.js'
import Test from './../containers/Test.js'

export default (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/test" component={Test} />
  </div>
)
