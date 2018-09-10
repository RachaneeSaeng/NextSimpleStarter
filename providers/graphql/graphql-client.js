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
					return null
				}
				return result.data
			})
			.catch(err => {
				console.log(err)
				return null
			})
	}
}

export default GraphqlClient
