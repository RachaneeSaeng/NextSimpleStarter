import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'

import LineLogin from '../components/LineLogin'
import ChatHomepage from '../components/ChatHomepage'

class Index extends React.Component {
	render() {
		return (
			<Layout>
				{this.props.lines.isAuthorized ? <ChatHomepage /> : <LineLogin />}
			</Layout>
		)
	}
}

export default connect(({ lines }) => ({ lines }))(Index)
