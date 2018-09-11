import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import GraphqlService from '../providers/graphql/graphql-service'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

const styles = {
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	inlineDiv: {
		display: 'inline'
	},
	avatar: {
		marginRight: 8,
		display: 'inline-block'
	},
	bigAvatar: {
		width: 40,
		height: 40
	}
}

class LatestChatProfile extends React.Component {
	constructor(props) {
		super(props)
		this.graphqlService = new GraphqlService()

		this.state = { userProfile: {} }
	}

	componentWillMount() {
		this.getUserProfile(this.props.lineId)
	}

	async getUserProfile(lineid) {
		var profile = await this.graphqlService.fetchLineUserProfile(lineid)
		this.setState({ userProfile: profile })
	}

	formatTimeStamp(timeStamp) {
		var dateTime = new Date('01/01/1970')
		dateTime.setMilliseconds(dateTime.getMilliseconds() + timeStamp)
		dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset()) // to local time

		const date = '0' + dateTime.getDate()
		const month = '0' + (dateTime.getMonth() + 1)
		const year = dateTime.getFullYear()
		var hours = dateTime.getHours()
		var minutes = '0' + dateTime.getMinutes()

		// Will display time in dd/mm/yy 10:30 format
		var formattedTime =
			date.substr(-2) +
			'/' +
			month.substr(-2) +
			'/' +
			year.toString().substr(-2) +
			' ' +
			hours +
			':' +
			minutes.substr(-2)
		return formattedTime
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				{this.state.userProfile && (
					<div className={classes.row}>
						<div className={classes.row}>
							<Avatar
								alt="Adelle Charles"
								src={this.state.userProfile.picture_url}
								className={classNames(classes.avatar, classes.bigAvatar)}
							/>
							<Link href={`/chat?userid=${this.props.lineId}`} prefetch>
								<a>{this.state.userProfile.display_name}</a>
							</Link>
						</div>
						<div>{this.formatTimeStamp(this.props.latestTime)}</div>
					</div>
				)}
			</div>
		)
	}
}

LatestChatProfile.propTypes = {
	lineId: string,
	latestTime: string,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LatestChatProfile)
