import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import { setLineAuthStatus } from '../actions/line'
import { withStyles } from '@material-ui/core/styles'
import ChatHomepage from '../components/ChatHomepage'
import LineLogin from '../components/LineLogin'

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
			marginLeft: 300,
			marginRight: 300,
			padding: 40
		}
	}
})

export default connect(
	({ lines }) => ({ lines }),
	{ setLineAuthStatus }
)(
	withStyles(styles)(
		class extends React.Component {
			componentWillMount() {
				this.props.setLineAuthStatus(true)
			}

			render() {
				return (
					<div className={this.props.classes.displayArea}>
						{this.props.lines.isAuthorized ? <ChatHomepage /> : <LineLogin />}
					</div>
				)
			}
		}
	)
)
