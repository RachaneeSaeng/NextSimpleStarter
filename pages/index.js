import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import { setLineAuthStatus } from '../actions/line'
import GraphqlService from '../providers/graphql/graphql-service'
import LineMessagingService from '../providers/line/line-messaging-service'

import ChatHomepage from '../components/ChatHomepage'
import LineLogin from '../components/LineLogin'

export default connect(
	({ lines }) => ({ lines }),
	{ setLineAuthStatus }
)(
	class extends React.Component {
		static async getInitialProps({ req, res, store }) {
			/* check access token here (from req.session )
		if access token is null or expire then redirect to login page, else redirect to Chathomepage
		*/
			var isAuthorized = true // to modify later
			store.dispatch(setLineAuthStatus(isAuthorized))

			const graphqlService = new GraphqlService()
			const lineMessagingService = new LineMessagingService()
			// var chats = await graphqlService.fetchAllLineMessages()
			// var profile = await lineMessagingService.get_user_profile(
			// 	'U3c95fef18e08b1635cd6cc1edbf443f6'
			// )
			// return {
			// 	allChats: profile
			// }

			return {}
		}

		render() {
			return (
				<div>
					{this.props.lines.isAuthorized ? <ChatHomepage /> : <LineLogin />}
				</div>
			)
		}
	}
)
