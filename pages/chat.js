import React from 'react'
import Error from 'next/error'
import { connect } from 'react-redux'
import Link from 'next/link'
import ChatHistory from '../components/ChatHistory'

export default connect(({ lines }) => ({ lines }))(
	class extends React.Component {
		static async getInitialProps({ query }) {
			var userId
			try {
				userId = query.userid
			} catch (e) {
				userId = undefined
			}
			return { userId }
		}

		render() {
			if (typeof this.props.userId === 'undefined' || !this.props.userId)
				return <Error statusCode={503} />

			return (
				<div>
					{this.props.lines.isAuthorized ? (
						<ChatHistory userId={this.props.userId} />
					) : (
						<Link href={`/`} prefetch>
							<a>You have not logged in yet. Go back to homepage to login.</a>
						</Link>
					)}{' '}
				</div>
			)
		}
	}
)
