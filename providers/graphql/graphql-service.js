import GraphqlQueryBuilder from './graphql-query-builder'
import GraphqlClient from './graphql-client'

var graphqlUrl = process.env.GraphqlUrl || 'http://localhost:3100/graphql'

export default class GraphqlService {
	constructor() {
		this.graphqlClient = new GraphqlClient(graphqlUrl)
		this.graphqlQueryBuilder = new GraphqlQueryBuilder()
	}

	async fetchLatestChatTime() {
		let query = this.graphqlQueryBuilder.latestChatTime()
		var result = await this.graphqlClient.executeQuery(query)
		return result ? result.latestChatTime.nodes : undefined
	}

	async fetchChatHistory(lineId) {
		let query = this.graphqlQueryBuilder.chatHistory(lineId)
		var result = await this.graphqlClient.executeQuery(query)
		return result ? result.chatHistory.nodes : undefined
	}

	async fetchLineUserProfile(lineId) {
		let query = this.graphqlQueryBuilder.lineUserProfileById(lineId)
		var result = await this.graphqlClient.executeQuery(query)
		return result ? result.lineUserProfileById : undefined
	}

	async fetchLineImgContent(messageId) {
		let query = this.graphqlQueryBuilder.lineImgContent(messageId)
		var result = await this.graphqlClient.executeQuery(query)
		return result ? result.lineImgContent : undefined
	}
}
