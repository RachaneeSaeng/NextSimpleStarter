import React from 'react'
import GraphqlService from '../providers/graphql/graphql-service'
import { formatTimeStamp } from '../utils/helper'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import ImageContent from './ImageContent'

const styles = {
	chatRecord: {
		margin: 5,
		display: 'flex',
		alignItems: 'center'
	},
	userChat: {
		justifyContent: 'flex-start'
	},
	botChat: {
		justifyContent: 'flex-end'
	},
	inline: {
		display: 'inline-block'
	},
	paper: {
		display: 'flex',
		alignItems: 'center'
	},
	avatar: {
		margin: 7,
		display: 'inline-block',
		width: 40,
		height: 40
	}
}

class ChatRecord extends React.Component {
	constructor(props) {
		super(props)
		this.graphqlService = new GraphqlService()
	}

	chatContent(message_type, message) {
		const { classes } = this.props
		switch (message_type) {
			case 'image':
				return <ImageContent messageId={message} />
			case 'sticker':
				return (
					<Typography className={classes.inline}>
						{'[STICKER]  ' + message}
					</Typography>
				)
			default:
				return (
					<Typography className={classes.inline}>
						{message.split('|||')[1]}
					</Typography>
				)
		}
	}

	async getImageContent(message_id) {
		var imgSrc = await this.graphqlService.fetchLineImgContent(message_id)
		return imgSrc
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				{this.props.chatDetail.sentByBot ? (
					<div className={classNames(classes.chatRecord, classes.botChat)}>
						<div className={classes.inline} style={{ paddingLeft: 20 }}>
							<Paper
								elevation={2}
								className={classes.paper}
								style={{ paddingLeft: 10 }}
							>
								{this.chatContent(
									this.props.chatDetail.messageType,
									this.props.chatDetail.message
								)}
								<Avatar className={classes.avatar}>Elfie</Avatar>
							</Paper>
							<Typography>
								{formatTimeStamp(this.props.chatDetail.sendTime)}
							</Typography>
						</div>
					</div>
				) : (
					<div className={classNames(classes.chatRecord, classes.userChat)}>
						<div className={classes.inline} style={{ paddingRight: 20 }}>
							<Paper
								elevation={2}
								className={classes.paper}
								style={{ paddingRight: 10 }}
							>
								<Avatar
									alt={this.props.userProfile.display_name}
									src={this.props.userProfile.picture_url}
									className={classes.avatar}
								/>
								{this.chatContent(
									this.props.chatDetail.messageType,
									this.props.chatDetail.message
								)}
							</Paper>
							<Typography style={{ textAlign: 'right' }}>
								{formatTimeStamp(this.props.chatDetail.sendTime)}
							</Typography>
						</div>
					</div>
				)}
			</div>
		)
	}
}

ChatRecord.propTypes = {
	userProfile: PropTypes.object.isRequired,
	chatDetail: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatRecord)
