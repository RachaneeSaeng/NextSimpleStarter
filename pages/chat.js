import React from 'react'
import Error from 'next/error'
import { connect } from 'react-redux'
import LineLogin from '../components/LineLogin'
import Link from 'next/link'
import Layout from '../components/Layout'

class Chat extends React.Component {
	static async getInitialProps({ req, res, query }) {
		var storyId
		try {
			storyId = query.id

			if (!/[0-9]+/.test(storyId)) throw 'Story ID must be numeric'
		} catch (e) {
			storyId = undefined
		}

		return { storyId }
	}

	render() {
		const { storyId } = this.props
		if (typeof storyId === 'undefined' || !storyId)
			return <Error statusCode={503} />

		return (
			<Layout>
				{this.props.lines.isAuthorized ? (
					<h1>Viewing chat history of user {storyId}</h1>
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
