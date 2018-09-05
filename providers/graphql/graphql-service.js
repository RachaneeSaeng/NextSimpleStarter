import GraphqlQueryBuilder from './graphql-query-builder'
import GraphqlClient from './graphql-client'

//var graphqlUrl = process.env.GraphqlUrl || 'http://localhost:3100/graphql'
var graphqlUrl = 'https://api.elephant.loans/graphql'

export default class GraphqlService {
	constructor() {
		this.graphqlClient = new GraphqlClient()
		this.graphqlQueryBuilder = new GraphqlQueryBuilder()
	}

	async fetchAllLineMessages() {
		let query = this.graphqlQueryBuilder.allLineMessages()
		var result = await this.graphqlClient.executeQuery(query)
		return result.allLineMessages.nodes
	}
}
