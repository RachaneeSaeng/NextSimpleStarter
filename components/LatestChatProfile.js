import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import GraphqlService from '../providers/graphql/graphql-service'
import { formatTimeStamp } from '../utils/helper'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'

const styles = {
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	button: {
		textTransform: 'none'
	},
	avatar: {
		marginRight: 5,
		display: 'inline-block',
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

	async getUserProfile(lineId) {
		var profile = await this.graphqlService.fetchLineUserProfile(lineId)
		this.setState({ userProfile: profile })
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				{this.state.userProfile && (
					<div className={classes.row}>
						<div className={classes.row}>
							<Avatar
								alt={this.state.userProfile.display_name}
								src={this.state.userProfile.picture_url}
								className={classes.avatar}
							/>
							<Link href={`/chat?lineId=${this.props.lineId}`} prefetch>
								<Button className={classes.button}>
									<a>{this.state.userProfile.display_name}</a>
								</Button>
							</Link>
						</div>
						<div>{formatTimeStamp(this.props.latestTime)}</div>
					</div>
				)}
			</div>
		)
	}
}

LatestChatProfile.propTypes = {
	lineId: PropTypes.string.isRequired,
	latestTime: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LatestChatProfile)
