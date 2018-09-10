import ApolloClient from 'apollo-boost'

class GraphqlClient {
	constructor(graphqlUrl) {
		this.graphqlClient = new ApolloClient({
			uri: graphqlUrl
		})
	}

	executeQuery(gqlQuery) {
		return this.graphqlClient
			.query({ query: gqlQuery })
			.then(result => {
				if (result.errors) {
					console.log(result.errors)
					return undefined
				}
				return result.data
			})
			.catch(err => {
				console.log(err)
				return undefined
			})
	}
}

export default GraphqlClient
