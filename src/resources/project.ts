import graphQLRequest from '../helper'

async function getAllEnvironments(projectId: string) {
  interface Response {
    environments: {
      edges: Array<{
        node: {
          id: string
          name: string
        }
      }>
    }
  }

  const response = await graphQLRequest<Response>(`
    query MyQuery {
      environments(projectId: "${projectId}") {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `)

  return response.environments.edges.map(edge => ({
    id: edge.node.id,
    name: edge.node.name,
  }))
}

export default {
  getAllEnvironments,
}
