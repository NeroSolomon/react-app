import { createStore } from 'redux'
import rootReducer from './../reducers/index.js'

let configStore = () => {
  return createStore(rootReducer)
}

export default configStore
