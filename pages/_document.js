import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
	render() {
		return (
			<html style={{ background: '#FFF', color: '#444' }}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
					/>
					<meta name="theme-color" content="#673ab7" />
					<link rel="manifest" href="static/manifest.json" />
					<link rel="icon" href="static/img/favicon.ico" />

					<title>CRM of elephant.Loans</title>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
