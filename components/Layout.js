import React from 'react'
import { connect } from 'react-redux'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'
import LineLogin from './LineLogin'
import ChatHomepage from './ChatHomepage'
import Button from '@material-ui/core/Button'

class Layout extends React.Component {
	componentWillMount() {
		this.props.setLineAuthStatus(true)
	}

	render() {
		const { children } = this.props
		return <div>{children}</div>
	}
}

export default connect(
	({ chats, lines, line_tokens }) => ({ chats, lines, line_tokens }),
	{ setLineAuthStatus, setLineAccessToken }
)(Layout)
