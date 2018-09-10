import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import GraphqlService from '../providers/graphql/graphql-service'
import LineMessagingService from '../providers/line/line-messaging-service'
import { setLineAuthStatus } from '../actions/line'
import Router from 'next/router'

const graphqlService = new GraphqlService()
const lineMessagingService = new LineMessagingService()

class Index extends React.Component {
	static async getInitialProps({ req, res, store }) {
		/* check access token here (from req.session )
		if access token is null or expire then redirect to login page, else redirect to Chathomepage
		*/
		var isAuthorized = true // to modify later
		store.dispatch(setLineAuthStatus(isAuthorized))

		// const redirectTo = isAuthorized ? '/homepage' : '/login'
		// if (res) {
		// 	res.writeHead(302, {
		// 		Location: redirectTo
		// 	})
		// 	res.end()
		// } else {
		// 	Router.push(redirectTo)
		// }

		return {}
	}

	constructor(props) {
		super(props)
		this.props.setLineAuthStatus(true)
	}

	render() {
		return <div>Index</div>
	}
}

export default connect(
	({ lines }) => ({ lines }),
	{ setLineAuthStatus }
)(Index)
