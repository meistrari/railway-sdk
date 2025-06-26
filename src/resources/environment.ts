import graphQLRequest, { graphQLifyObject } from '../helper'

async function get({
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

async function create(input: {
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
async function deleteToken({
  projectId,
  environmentId,
}: {
  projectId: string
  environmentId: string
}) {
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
}

async function createToken({
  projectId,
  environmentId,
  tokenName,
}: {
  environmentId: string
  projectId: string
  tokenName: string
}) {
  await deleteToken({ projectId, environmentId })

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

async function waitForDeployment({
  projectId,
  environmentId,
  serviceId,
  requestInterval = 5000,
  poolTimeout,
}: {
  projectId: string
  environmentId: string
  serviceId: string
  requestInterval?: number
  poolTimeout?: number
}) {
  interface Deployment {
    id: string
    status: string
    updatedAt: string
  }

  const progressStatuses = ['INITIALIZING', 'BUILDING', 'DEPLOYING']
  const failureStatuses = ['FAILED', 'CRASHED', 'REMOVED']
  const successStatuses = ['SUCCESS']

  const start = Date.now()

  while (true) {
    if (poolTimeout && Date.now() - start > poolTimeout) {
      throw new Error(`Deployment timed out after ${poolTimeout}ms`)
    }

    interface LatestDeploymentResponse {
      deployments: {
        edges: Array<{
          node: Deployment
        }>
      }
    }
    const input = {
      projectId,
      environmentId,
      serviceId,
    }
    const data = await graphQLRequest<LatestDeploymentResponse>(`
        query MyQuery {
            deployments(input: ${graphQLifyObject(input)}, first: 1) {
                edges {
                    node {
                        id
                        status
                        updatedAt
                    }
                }
            }
        }
    `)

    const [deployment] = data.deployments.edges

    if (!deployment) {
      throw new Error('No deployments found.')
    }

    const deploymentStatus = deployment.node.status

    if (successStatuses.includes(deploymentStatus)) {
      break
    }

    if (progressStatuses.includes(deploymentStatus)) {
      await new Promise(resolve => setTimeout(resolve, requestInterval))
      continue
    }

    if (failureStatuses.includes(deploymentStatus)) {
      throw new Error(`Deployment failed with status: ${deploymentStatus}`)
    }

    throw new Error(`Unknown deployment status: ${deploymentStatus}`)
  }
}

async function deleteEnvironment(environmentId: string) {
  interface DeleteEnvironmentResponse {
    environmentDelete: boolean
  }
  const response = await graphQLRequest<DeleteEnvironmentResponse>(`
    mutation MyMutation {
      environmentDelete(id: "${environmentId}")
    }
  `)

  if (!response.environmentDelete) {
    throw new Error(`Failed to delete environment with ID: ${environmentId}`)
  }
}

async function rename(environmentId: string, newName: string) {
  await graphQLRequest(`
    mutation MyMutation {
      environmentRename(id: "${environmentId}", input: { name: "${newName}" }) {
        id
      }
    }
  `)
}

export default {
  get,
  create,
  rename,
  deleteToken,
  createToken,
  waitForDeployment,
  deleteEnvironment,
}
