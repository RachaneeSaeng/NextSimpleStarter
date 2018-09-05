import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chat'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import Router from 'next/router'
import GraphqlService from '../providers/backend/graphql/graphql-service'

import gql from 'graphql-tag'

const graphqlService = new GraphqlService()

class ChatHomepage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			allLineChats: []
		}
	}

	async getData() {
		var data = await graphqlService.fetchAllLineMessages()
		this.setState({ allLineChats: data })
	}

	componentWillMount() {
		this.getData()
	}

	render() {
		return (
			<div>
				<h1>Chat Homepage</h1>
				<ul>
					{this.state.allLineChats.map((chat, i) => (
						<div key={i}>
							<Link href={`/chat?userid=${chat.userLineId}`} prefetch>
								<a>user {chat.userLineId}</a>
							</Link>
							<br />
						</div>
					))}
				</ul>
			</div>
		)
	}
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLatestReadId, setLineAuthStatus, setLineAccessToken }
)(ChatHomepage)
