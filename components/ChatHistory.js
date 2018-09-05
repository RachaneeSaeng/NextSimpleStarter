import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chat'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import Router from 'next/router'

class ChatHistory extends React.Component {
	render() {
		return (
			<div>
				<h1>Chat History of {this.props.userId}</h1>
			</div>
		)
	}
}

ChatHistory.propTypes = {
	userId: string
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLatestReadId, setLineAuthStatus, setLineAccessToken }
)(ChatHistory)
