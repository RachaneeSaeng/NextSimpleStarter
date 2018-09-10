import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { PersistGate } from 'redux-persist/integration/react'

import makeStore from '../utils/store'

const dev =
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'

/* debug to log how the store is being used */
export default withRedux(makeStore, { debug: dev })(
	class extends App {
		static async getInitialProps({ Component, ctx }) {
			return {
				pageProps: {
					// Call page-level getInitialProps
					...(Component.getInitialProps
						? await Component.getInitialProps(ctx)
						: {})
				}
			}
		}

		render() {
			const { Component, pageProps, store } = this.props
			return (
				<Container>
					<Provider store={store}>
						<PersistGate
							persistor={store.__persistor}
							loading={<div>Loading</div>}
						>
							<Component {...pageProps} />
						</PersistGate>
					</Provider>
				</Container>
			)
		}
	}
)
