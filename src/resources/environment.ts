import graphQLRequest, { graphQLifyObject } from '../helper'

export async function get({
  projectId,
  environmentName,
}: {
  projectId: string
  environmentName: string
}) {
  const data = await graphQLRequest<{
    environments: {
      edges: Array<{
        node: {
          id: string
          name: string
        }
      }>
    }
  }>(`
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

  const environment = data.environments.edges.find(edge => edge.node.name === environmentName)

  if (!environment) {
    return null
  }

  return environment.node.id
}

export async function create(input: {
  name: string
  projectId: string

  ephemeral?: boolean
  /**
   * When committing the changes immediately, skip any initial deployments.
   */
  skipInitialDeploys?: boolean
  /**
   * Create the environment with all of the services, volumes, configuration, and variables from this source environment.
   */
  sourceEnvironmentId?: string
  /**
   * Stage the initial changes for the environment. If false (default), the changes will be committed immediately.
   */
  stageInitialChanges?: boolean
}) {
  interface Response {
    environmentCreate: {
      id: string
    }
  }
  const environment = await graphQLRequest<Response>(`
    mutation MyMutation {
      environmentCreate(input: ${graphQLifyObject(input)}) {
        id
      }
    }
  `)

  return environment.environmentCreate.id
}

interface CreateTokenInput {
  environmentId: string
  projectId: string
  tokenName: string
}
export async function createToken({
  projectId,
  environmentId,
  tokenName,
}: CreateTokenInput) {
  const existingTokens = await graphQLRequest<{
    projectTokens: {
      edges: Array<{
        node: {
          id: string
          environment: {
            id: string
          }
        }
      }>
    }
  }>(`
    query MyQuery {
      projectTokens(projectId: "${projectId}") {
        edges {
          node {
            id
            environment {
              id
            }
          }
        }
      }
    }
  `)

  const environmentExistingToken = existingTokens.projectTokens.edges.find(edge => edge.node.environment.id === environmentId)
  if (environmentExistingToken) {
    await graphQLRequest(`
      mutation MyMutation {
        projectTokenDelete(id: "${environmentExistingToken.node.id}")
      }
    `)
  }

  const createdTokenResponse = await graphQLRequest<{
    projectTokenCreate: string
  }>(`
    mutation MyMutation {
      projectTokenCreate(input: {
        environmentId: "${environmentId}",
        name: "${tokenName}",
        projectId: "${projectId}"
      })
    }
  `)

  return createdTokenResponse.projectTokenCreate
}
