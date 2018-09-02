import { SET_LATEST_READ } from './'

export function setLatestReadId(latestReadId) {
	return {
		type: SET_LATEST_READ,
		latestReadId
	}
}
