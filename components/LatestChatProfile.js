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

	async getUserProfile(lineid) {
		var profile = await this.graphqlService.fetchLineUserProfile(lineid)
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
								alt="Adelle Charles"
								src={this.state.userProfile.picture_url}
								className={classes.avatar}
							/>
							<Link href={`/chat?userid=${this.props.lineId}`} prefetch>
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
	lineId: string,
	latestTime: string,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LatestChatProfile)
