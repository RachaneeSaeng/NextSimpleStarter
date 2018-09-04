import React from 'react'
import { connect } from 'react-redux'
import LineLogin from './LineLogin'
import ChatHomepage from './ChatHomepage'

class Homepage extends React.Component {
	render() {
		return (
			<div>
				{this.props.lines.isAuthorized ? <ChatHomepage /> : <LineLogin />}
			</div>
		)
	}
}

export default connect(({ lines }) => ({ lines }))(Homepage)
