import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const uiReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default combineReducers({
  auth,
  message,
  ui: uiReducer,
})
