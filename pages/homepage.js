import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chat'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import ChatHomepage from '../components/ChatHomepage'
import Link from 'next/link'

import GraphqlService from '../providers/graphql/graphql-service'
import LineMessagingService from '../providers/line/line-messaging-service'

const graphqlService = new GraphqlService()
const lineMessagingService = new LineMessagingService()

class Homepage extends React.Component {
	static async getInitialProps(ctx) {
		// var chats = await graphqlService.fetchAllLineMessages()
		// var profile = await lineMessagingService.get_user_profile(
		// 	'U3c95fef18e08b1635cd6cc1edbf443f6'
		// )
		// return {
		// 	allChats: profile
		// }
	}

	render() {
		return (
			<div>
				{this.props.lines.isAuthorized ? (
					<ChatHomepage />
				) : (
					<Link href={'/login'} prefetch>
						<a>You have not logged in yet. Go to login page.</a>
					</Link>
				)}{' '}
			</div>
		)
	}
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLatestReadId, setLineAuthStatus, setLineAccessToken }
)(Homepage)
