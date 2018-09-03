import { SET_LINE_AUTH_STATUS } from '../actions'

export default function(state = [], action) {
	const { type, isAuthorized } = action

	switch (type) {
		case SET_LINE_AUTH_STATUS:
			return {
				...state,
				isAuthorized: isAuthorized
			}
		default:
			return state
	}
}
