/**
 * Manage Railway environments
 * @module environment
 */

import graphQLRequest, { graphQLifyInputs, graphQLifyObject } from '../helper'
import project from './project'

/**
 * Get an environment by name
 * @param {object} input - The input parameters
 * @param {string} input.projectId - The project ID
 * @param {string} input.environmentName - The environment name
 * @returns {Promise<string | null>} The environment ID or null if not found
 */
export async function get({
  projectId,
  environmentName,
}: {
  projectId: string
  environmentName: string
}) {
  const environments = await project.getAllEnvironments(projectId)

  const environment = environments.find(environment => environment.name === environmentName)

  if (!environment) {
    return null
  }

  return environment.id
}

/**
 * Create an environment
 * @param {object} input - The input parameters
 * @param {string} input.name - The environment name
 * @param {string} input.projectId - The project ID
 * @param {boolean} input.ephemeral - Whether the environment is ephemeral
 * @param {boolean} input.skipInitialDeploys - When committing the changes immediately, skip any initial deployments.
 * @param {string} input.sourceEnvironmentId - Create the environment with all of the services, volumes, configuration, and variables from this source environment.
 * @param {boolean} input.stageInitialChanges - Stage the initial changes for the environment. If false (default), the changes will be committed immediately.
 * @returns {Promise<string>} The environment ID
 */
export async function create(input: {
  name: string
  projectId: string
  ephemeral?: boolean
  skipInitialDeploys?: boolean
  sourceEnvironmentId?: string
  stageInitialChanges?: boolean
  applyChangesInBackground?: boolean
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

/**
 * Delete an environment token
 * @param {object} input - The input parameters
 * @param {string} input.projectId - The project ID
 * @param {string} input.environmentId - The environment ID
 * @returns {Promise<void>}
 */
export async function deleteToken({
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

/**
 * Create an environment token
 * @param {object} input - The input parameters
 * @param {string} input.projectId - The project ID
 * @param {string} input.environmentId - The environment ID
 * @param {string} input.tokenName - The token name
 * @returns {Promise<string>} The token ID
 */
export async function createToken({
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

/**
 * Wait for a deployment to complete
 * @param {object} input - The input parameters
 * @param {string} input.projectId - The project ID
 * @param {string} input.environmentId - The environment ID
 * @param {string} input.serviceId - The service ID
 * @param {number} input.requestInterval - The request interval
 * @param {number} input.poolTimeout - The pool timeout
 * @returns {Promise<void>}
 */
export async function waitForDeployment({
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

interface PatchData {
  services: Record<string, {
    source: {
      branch: string | null
    }
  }>
}

async function patch(environmentId: string, commitMessage: string, patch: PatchData) {
  const input = {
    environmentId,
    commitMessage,
    patch: '$patch',
  }

  await graphQLRequest(`
    mutation MyMutation($patch: EnvironmentConfig) {
      environmentPatchCommit(${graphQLifyInputs(input)})
    }
  `, {
    patch,
  })
}

export default {
  get,
  patch,
  create,
  rename,
  deleteToken,
  createToken,
  waitForDeployment,
  deleteEnvironment,
}
