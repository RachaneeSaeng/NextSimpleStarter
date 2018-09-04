import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chat'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import Router from 'next/router'

class ChatHomepage extends React.Component {
	render() {
		return (
			<div>
				<h1>Chat Homepage</h1>
				<Link href={`/chat?id=5`} prefetch>
					<a>user 5</a>
				</Link>
				<br />
				<Link href={`/chat?id=88`} prefetch>
					<a>user 88</a>
				</Link>
			</div>
		)
	}
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLatestReadId, setLineAuthStatus, setLineAccessToken }
)(ChatHomepage)
