import gql from 'graphql-tag'

export default class GraphqlQueryBuilder {
	/***************************************** QUERY **********************************************/

	allLineMessages() {
		return gql`
			{
				allLineMessages(orderBy: TIMESTAMP_DESC) {
					nodes {
						messageId
						userLineId
						message
						messageType
						timestamp
					}
				}
			}
		`
	}

	/***************************************** MUTATION **********************************************/
}
