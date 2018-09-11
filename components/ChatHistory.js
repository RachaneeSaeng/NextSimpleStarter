import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chat'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import Router from 'next/router'
import GraphqlService from '../providers/graphql/graphql-service'
import PropTypes from 'prop-types'
import ChatRecord from './ChatRecord'
import { formatTimeStamp } from '../utils/helper'

class ChatHistory extends React.Component {
	constructor(props) {
		super(props)
		this.graphqlService = new GraphqlService()

		this.state = { userProfile: {}, chats: [] }
	}

	componentWillMount() {
		this.getUserProfile(this.props.lineId)
		this.getChatHistory(this.props.lineId)
	}

	async getUserProfile(lineId) {
		var profile = await this.graphqlService.fetchLineUserProfile(lineId)
		this.setState({ userProfile: profile })
	}

	async getChatHistory(lineId) {
		var chats = await this.graphqlService.fetchChatHistory(lineId)
		this.setState({ chats: chats })
	}

	render() {
		return (
			<div>
				<h1>
					Chat history of <i>{this.state.userProfile.display_name}</i>
				</h1>
				<ul>
					{this.state.chats &&
						this.state.chats.map((chat, i) => (
							<ChatRecord
								key={i}
								userProfile={this.state.userProfile}
								chatDetail={chat}
							/>
						))}
				</ul>
			</div>
		)
	}
}

ChatHistory.propTypes = {
	lineId: PropTypes.string.isRequired
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLatestReadId, setLineAuthStatus, setLineAccessToken }
)(ChatHistory)
