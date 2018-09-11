import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import LatestChatProfile from './LatestChatProfile'
import Router from 'next/router'
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
				<h1>ChatHomepage</h1>
				<ul>
					{this.state.latestChats &&
						this.state.latestChats.map((chat, i) => (
							<LatestChatProfile
								key={i}
								lineId={chat.lineId}
								latestTime={chat.latestTime}
							/>
						))}
				</ul>
			</div>
		)
	}
}

export default connect()(ChatHomepage)
