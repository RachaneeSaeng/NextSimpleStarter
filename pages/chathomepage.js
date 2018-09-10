import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chat'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'

import GraphqlService from '../providers/graphql/graphql-service'
import LineMessagingService from '../providers/line/line-messaging-service'

const graphqlService = new GraphqlService()
const lineMessagingService = new LineMessagingService()

class ChatHomepage extends React.Component {
	static async getInitialProps(ctx) {
		var chats = await graphqlService.fetchAllLineMessages()
		var profile = await lineMessagingService.get_user_profile(
			'U3c95fef18e08b1635cd6cc1edbf443f6'
		)

		//console.log(imgData)
		//imgData = 'data:image/jpeg;base64,' + btoa(imgData)
		return {
			allChats: chats,
			userProfile: profile
		}
	}

	render() {
		return (
			<div>
				<h1>Chat Homepage</h1>
			</div>
		)
	}
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLatestReadId, setLineAuthStatus, setLineAccessToken }
)(ChatHomepage)
