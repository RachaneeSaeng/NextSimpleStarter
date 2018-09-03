import { SET_LINE_AUTH_STATUS } from '.'

export function setLineAuthStatus(isAuthorized) {
	return {
		type: SET_LINE_AUTH_STATUS,
		isAuthorized
	}
}
