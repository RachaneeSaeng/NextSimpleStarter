import { SET_LATEST_READ } from '../actions'

export default function(state = [], action) {
	const { type, latestReadId } = action

	switch (type) {
		case SET_LATEST_READ:
			return {
				...state,
				latestReadId: latestReadId
			}
		default:
			return state
	}
}
