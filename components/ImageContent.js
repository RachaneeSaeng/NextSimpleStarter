import React from 'react'
import GraphqlService from '../providers/graphql/graphql-service'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'

const styles = theme => ({
	progress: {
		margin: theme.spacing.unit * 2
	}
})

class ImageContent extends React.Component {
	constructor(props) {
		super(props)
		this.graphqlService = new GraphqlService()
		this.state = { imgSrc: undefined, open: false }
	}

	componentWillMount() {
		this.getImageContent(this.props.messageId)
	}

	async getImageContent(message_id) {
		var imgSrc = await this.graphqlService.fetchLineImgContent(message_id)
		this.setState({ imgSrc: imgSrc })
	}

	handleClickOpen() {
		this.setState({
			open: true
		})
	}

	handleClose() {
		this.setState({ open: false })
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				{this.state.imgSrc ? (
					<div>
						<img
							src={this.state.imgSrc}
							width="200"
							style={{ cursor: 'pointer' }}
							onClick={this.handleClickOpen.bind(this)}
						/>
						<Dialog
							maxWidth="lg"
							onClick={this.handleClose.bind(this)}
							open={this.state.open}
						>
							<img src={this.state.imgSrc} width="100%" />
						</Dialog>
					</div>
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
