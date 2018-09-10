import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import LineLogin from '../components/LineLogin'
import GraphqlService from '../providers/graphql/graphql-service'
import LineMessagingService from '../providers/line/line-messaging-service'

const graphqlService = new GraphqlService()
const lineMessagingService = new LineMessagingService()

class Index extends React.Component {
	static async getInitialProps(ctx) {
		var chats = await graphqlService.fetchAllLineMessages()
		var src = await lineMessagingService.get_message_content('8530379865968')
		var profile = await lineMessagingService.get_user_profile(
			'U3c95fef18e08b1635cd6cc1edbf443f6'
		)
		return {
			allChats: chats,
			userProfile: profile,
			imgSrc: src
		}
	}

	render() {
		console.log(this.props)
		return (
			<Layout>
				<LineLogin />
				<img src={this.props.imgSrc} />
			</Layout>
		)
	}
}

export default connect(({ lines }) => ({ lines }))(Index)
