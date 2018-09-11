import gql from 'graphql-tag'

export default class GraphqlQueryBuilder {
	/***************************************** QUERY **********************************************/

	latestChatTime() {
		return gql`
			{
				latestChatTime {
					nodes {
						lineId
						latestTime
					}
				}
			}
		`
	}

	chatHistory(lineId) {
		return gql`
			{
				chatHistory(lineId: "${lineId}"){
					nodes{
						sentByBot
						message
						messageType
						sendTime
					}
				}
			}
		`
	}

	lineUserProfileById(lineId) {
		return gql`
			{
				lineUserProfileById(user_id: "${lineId}")
				{
					user_id
					display_name
					picture_url
					status_message
				}
			}
		`
	}

	lineImgContent(messageId) {
		return gql`
			{
				lineImgContent(message_id: "${messageId}")  
			}
		`
	}

	/***************************************** MUTATION **********************************************/
}
