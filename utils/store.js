import { createStore, compose, applyMiddleware } from 'redux'

import rootReducer from '../reducers'

const enhancers = compose(
	typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'
		? window.devToolsExtension && window.devToolsExtension()
		: f => f
)

const createStoreWithMiddleware = applyMiddleware()(createStore)

export default function makeStore(initialState, { isServer }) {
	if (isServer) {
		initialState = initialState || { latestReadId: 0 }

		return createStoreWithMiddleware(rootReducer, initialState, enhancers)
	} else {
		// we need it only on client side
		const { persistStore, persistReducer } = require('redux-persist')
		const storage = require('redux-persist/lib/storage').default

		const persistConfig = {
			key: 'nextjs',
			whitelist: ['chats'], // make sure it does not clash with server keys
			storage
		}

		const persistedReducer = persistReducer(persistConfig, rootReducer)
		const store = createStoreWithMiddleware(
			persistedReducer,
			initialState,
			enhancers
		)

		store.__persistor = persistStore(store) // Nasty hack

		return store
	}
}
