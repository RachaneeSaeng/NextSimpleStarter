import React from 'react'
import Error from 'next/error'
import { connect } from 'react-redux'
import Link from 'next/link'
import ChatHistory from '../components/ChatHistory'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	displayArea: {
		backgroundColor: '#EEE',
		padding: 10,
		[theme.breakpoints.up('sm')]: {
			marginLeft: 80,
			marginRight: 80,
			padding: 20
		},
		[theme.breakpoints.up('md')]: {
			marginLeft: 150,
			marginRight: 150,
			padding: 40
		},
		[theme.breakpoints.up('lg')]: {
			marginLeft: 250,
			marginRight: 250,
			padding: 40
		}
	}
})

export default connect(({ lines }) => ({ lines }))(
	withStyles(styles)(
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
					<div className={this.props.classes.displayArea}>
						{this.props.lines.isAuthorized ? (
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
)
