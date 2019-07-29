import { combineReducers } from 'redux'

const user = function(state = { name: 'redux' }, action) {
  switch (action.type) {
    case 'CHANG_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return {
        ...state
      }
  }
}

const project = function(state = { name: 'react' }, action) {
  switch (action.type) {
    case 'CHANGE_CLI':
      return {
        ...state,
        name: action.name
      }
    default:
      return {
        ...state
      }
  }
}

const rootReducer = combineReducers({ user, project })

export default rootReducer
