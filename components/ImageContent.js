import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import GraphqlService from '../providers/graphql/graphql-service'
import { formatTimeStamp } from '../utils/helper'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
	progress: {
		margin: theme.spacing.unit * 2
	}
})

class ImageContent extends React.Component {
	constructor(props) {
		super(props)
		this.graphqlService = new GraphqlService()
		this.state = { imgSrc: undefined }
	}

	componentWillMount() {
		this.getImageContent(this.props.messageId)
	}

	async getImageContent(message_id) {
		var imgSrc = await this.graphqlService.fetchLineImgContent(message_id)
		this.setState({ imgSrc: imgSrc })
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				{this.state.imgSrc ? (
					<img src={this.state.imgSrc} width="200" />
				) : (
					<CircularProgress className={classes.progress} size={30} />
				)}
			</div>
		)
	}
}

ImageContent.propTypes = {
	messageId: PropTypes.string.isRequired
}

export default withStyles(styles)(ImageContent)
