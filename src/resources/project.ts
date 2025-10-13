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
      pageInfo: {
        hasNextPage: boolean
        endCursor: string
      }
    }
  }

  const allEnvironments: Array<{ id: string, name: string }> = []
  let hasNextPage = true
  let cursor: string | undefined

  while (hasNextPage) {
    const params: Record<string, string> = { projectId }
    if (cursor) {
      params.after = cursor
    }

    const paramsString = Object.entries(params)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(', ')

    const response = await graphQLRequest<Response>(`
      query MyQuery {
        environments(${paramsString}) {
          edges {
            node {
              id
              name
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `)

    const environments = response.environments.edges.map(edge => ({
      id: edge.node.id,
      name: edge.node.name,
    }))

    allEnvironments.push(...environments)
    hasNextPage = response.environments.pageInfo.hasNextPage
    cursor = response.environments.pageInfo.endCursor
  }

  return allEnvironments
}

export default {
  getAllEnvironments,
}
