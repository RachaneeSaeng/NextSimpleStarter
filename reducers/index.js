import { combineReducers } from 'redux'

import chats from './chats'
import lines from './lines'
import line_tokens from './line_tokens'

export default combineReducers({ chats, lines, line_tokens })
