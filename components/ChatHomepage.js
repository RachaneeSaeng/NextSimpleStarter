import React from 'react'
import { connect } from 'react-redux'
import LatestChatProfile from './LatestChatProfile'
import GraphqlService from '../providers/graphql/graphql-service'

class ChatHomepage extends React.Component {
	constructor(props) {
		super(props)
		this.graphqlService = new GraphqlService()

		this.state = { latestChats: [] }
	}

	componentDidMount() {
		this.getLatestChatTime()
	}

	async getLatestChatTime() {
		var latestChat = await this.graphqlService.fetchLatestChatTime()
		this.setState({ latestChats: latestChat })
	}

	render() {
		return (
			<div>
				<br />
				{this.state.latestChats &&
					this.state.latestChats.map((chat, i) => (
						<LatestChatProfile
							key={i}
							lineId={chat.lineId}
							latestTime={chat.latestTime}
						/>
					))}
			</div>
		)
	}
}

export default connect()(ChatHomepage)
