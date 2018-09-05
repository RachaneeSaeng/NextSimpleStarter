import React from 'react'
import Error from 'next/error'
import { connect } from 'react-redux'
import Link from 'next/link'
import Layout from '../components/Layout'
import ChatHistory from '../components/ChatHistory'

class Chat extends React.Component {
	static async getInitialProps({ req, res, query }) {
		var userId
		try {
			userId = query.userid
			if (!/[0-9]+/.test(userId)) throw 'userid must be numeric'
		} catch (e) {
			userId = undefined
		}

		return { userId }
	}

	render() {
		const { userId } = this.props
		if (typeof userId === 'undefined' || !userId)
			return <Error statusCode={503} />

		return (
			<Layout>
				{this.props.lines.isAuthorized ? (
					<ChatHistory userId={userId} />
				) : (
					<Link href={`/`} prefetch>
						<a>You have not logged in yet. Go back to homepage to login.</a>
					</Link>
				)}{' '}
			</Layout>
		)
	}
}

export default connect(({ lines }) => ({ lines }))(Chat)
