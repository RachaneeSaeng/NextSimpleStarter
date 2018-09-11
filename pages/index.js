import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import { setLineAuthStatus } from '../actions/line'

import ChatHomepage from '../components/ChatHomepage'
import LineLogin from '../components/LineLogin'

export default connect(
	({ lines }) => ({ lines }),
	{ setLineAuthStatus }
)(
	class extends React.Component {
		componentWillMount() {
			this.props.setLineAuthStatus(true)
		}

		render() {
			return (
				<div>
					{this.props.lines.isAuthorized ? <ChatHomepage /> : <LineLogin />}
				</div>
			)
		}
	}
)
