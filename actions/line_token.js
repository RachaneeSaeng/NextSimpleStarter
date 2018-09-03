import { SET_LINE_ACCESS_TOKEN } from '.'

export function setLineAccessToken(token) {
	return {
		type: SET_LINE_ACCESS_TOKEN,
		lineToken: token
	}
}
