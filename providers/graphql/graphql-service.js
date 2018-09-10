import GraphqlQueryBuilder from './graphql-query-builder'
import GraphqlClient from './graphql-client'

var graphqlUrl =
	process.env.GraphqlUrl || 'https://stg.api.elephant.loans/graphql'

export default class GraphqlService {
	constructor() {
		this.graphqlClient = new GraphqlClient(graphqlUrl)
		this.graphqlQueryBuilder = new GraphqlQueryBuilder()
	}

	async fetchAllLineMessages() {
		let query = this.graphqlQueryBuilder.allLineMessages()
		var result = await this.graphqlClient.executeQuery(query)
		return result.allLineMessages.nodes
	}
}
