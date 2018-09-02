import React from 'react'
import { connect } from 'react-redux'
import { setLatestReadId } from '../actions/chats'
import Button from '@material-ui/core/Button'

class MUI extends React.Component {
	setLatestReadId(id) {
		var latestId = this.props.chats.latestReadId || 0
		this.props.setLatestReadId(latestId + id)
	}

	render() {
		return (
			<Button
				variant="contained"
				color="primary"
				onClick={e => this.setLatestReadId(1)}
			>
				Set Client State
			</Button>
		)
	}
}

MUI.propTypes = {
	title: string,
	description: string
}

export default connect(
	({ chats }) => ({ chats }),
	{ setLatestReadId }
)(MUI)
