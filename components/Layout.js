import React from 'react'
import { connect } from 'react-redux'
import { setLineAuthStatus } from '../actions/line'
import { setLineAccessToken } from '../actions/line_token'

class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.props.setLineAuthStatus(true)
	}

	render() {
		const { children } = this.props
		return <div>{children}</div>
	}
}

export default connect(
	({ lines, line_tokens }) => ({ lines, line_tokens }),
	{ setLineAuthStatus, setLineAccessToken }
)(Layout)
