import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import LineLogin from '../components/LineLogin'
import Router from 'next/router'

import GraphqlService from '../providers/graphql/graphql-service'
import LineMessagingService from '../providers/line/line-messaging-service'

const graphqlService = new GraphqlService()
const lineMessagingService = new LineMessagingService({
	channel_access_token:
		process.env.LINE_MESSAGING_TOKEN ||
		'FVk42L1S6K2ttuQNUz9/B1Db+tfCKvh3zcGlXjAj5RcEkGP395jK3ztlLLeX/pte5V5q670cmwBhcK3yTFSMvsjIWG+816Q2lgAJQYHsKi7ezovlbmoTWS2Nliw5sCzTzbqsi1sxYf1t6t/3oUOvtAdB04t89/1O/w1cDnyilFU=',
	channel_secret:
		process.env.LINE_MESSAGING_SECRET || '82ab29e5586ec2d769bca233487ca1f0'
})

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
		var { imgSrc } = this.props
		console.log(this.props)
		return (
			<Layout>
				<LineLogin />
				<img src={imgSrc} />
			</Layout>
		)
	}
}

export default connect(({ lines }) => ({ lines }))(Index)
