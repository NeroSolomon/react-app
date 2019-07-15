import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './config/routes.js'
import configStore from './store/store-config.js'

const store = configStore()
console.log(store.getState())

function App() {
  return (
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>
  )
}

export default App
