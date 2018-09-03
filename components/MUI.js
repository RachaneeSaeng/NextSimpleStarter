import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chat'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import Button from '@material-ui/core/Button'

class MUI extends React.Component {
	setLatestReadId(id) {
		var latestId = this.props.chats.latestReadId || 0
		this.props.setLatestReadId(latestId + id)
	}

	toggleLineAuthStatus() {
		var isAuthorized = this.props.lines.isAuthorized || false
		this.props.setLineAuthStatus(!isAuthorized)
	}

	setLineToken() {
		var token = this.props.line_tokens.lineToken || { userId: 10 }
		token.userId += 1

		this.props.setLineAccessToken(token)
	}

	render() {
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={this.setLatestReadId.bind(this, 1)}
				>
					Set Client State
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={this.toggleLineAuthStatus.bind(this)}
				>
					Toggle line authen status
				</Button>
				<h3>{this.props.lines.isAuthorized ? 'Authed' : 'no'}</h3>
				<Button
					variant="contained"
					color="primary"
					onClick={this.setLineToken.bind(this)}
				>
					Test store token
				</Button>
			</div>
		)
	}
}

MUI.propTypes = {
	title: string,
	description: string
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLatestReadId, setLineAuthStatus, setLineAccessToken }
)(MUI)
