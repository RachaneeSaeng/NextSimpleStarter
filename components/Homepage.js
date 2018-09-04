import React from 'react'
import { connect } from 'react-redux'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import LineLogin from './LineLogin'
import ChatHomepage from './ChatHomepage'
import Button from '@material-ui/core/Button'

class Homepage extends React.Component {
	toggleLineAuthStatus() {
		var isAuthorized = this.props.lines.isAuthorized || false
		this.props.setLineAuthStatus(!isAuthorized)
	}

	render() {
		return (
			<div>
				{this.props.lines.isAuthorized ? <ChatHomepage /> : <LineLogin />}
			</div>
		)
	}
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLineAuthStatus, setLineAccessToken }
)(Homepage)
