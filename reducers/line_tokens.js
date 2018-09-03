import { SET_LINE_ACCESS_TOKEN } from '../actions'

export default function(state = [], action) {
	const { type, lineToken } = action

	switch (type) {
		case SET_LINE_ACCESS_TOKEN:
			return {
				...state,
				lineToken: lineToken
			}
		default:
			return state
	}
}
