import React from 'react'
import Link from 'next/link'
import GraphqlService from '../providers/graphql/graphql-service'
import { formatTimeStamp } from '../utils/helper'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

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

		this.state = { userProfile: {}, doneFetching: false }
	}

	componentWillMount() {
		this.getUserProfile(this.props.lineId)
	}

	async getUserProfile(lineId) {
		var profile = await this.graphqlService.fetchLineUserProfile(lineId)
		this.setState({ userProfile: profile, doneFetching: true })
	}

	render() {
		const { classes } = this.props

		if (this.state.doneFetching) {
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
		} else {
			return <CircularProgress className={classes.progress} size={30} />
		}
	}
}

LatestChatProfile.propTypes = {
	lineId: PropTypes.string.isRequired,
	latestTime: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LatestChatProfile)
