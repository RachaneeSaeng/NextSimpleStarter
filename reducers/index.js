import { combineReducers } from 'redux'

import todos from './todos'
import chats from './chats'

export default combineReducers({ todos, chats })
