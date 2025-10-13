import graphQLRequest, { graphQLifyObject } from '../helper'

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
    const input: Record<string, any> = { projectId }
    if (cursor) {
      input.after = cursor
    }

    const response = await graphQLRequest<Response>(`
      query MyQuery {
        environments(${graphQLifyObject(input)}) {
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
