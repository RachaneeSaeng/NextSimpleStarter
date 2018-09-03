import { combineReducers } from 'redux'

import todos from './todos'
import chats from './chats'
import lines from './lines'
import line_tokens from './line_tokens'

export default combineReducers({ todos, chats, lines, line_tokens })
