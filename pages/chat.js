import React from 'react'
import Error from 'next/error'
import { connect } from 'react-redux'
import Link from 'next/link'
import ChatHistory from '../components/ChatHistory'

export default connect(({ lines }) => ({ lines }))(
	class extends React.Component {
		static async getInitialProps({ query }) {
			var lineId
			try {
				lineId = query.lineId
			} catch (e) {
				lineId = undefined
			}
			return { lineId }
		}

		render() {
			if (typeof this.props.lineId === 'undefined' || !this.props.lineId)
				return <Error statusCode={503} />

			return (
				<div>
					{true ? (
						<ChatHistory lineId={this.props.lineId} />
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
