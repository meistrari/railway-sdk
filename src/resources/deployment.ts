/**
 * Manage Railway deployments
 * @module deployment
 */
import { z } from 'zod'
import graphQLRequest, { graphQLifyObject, zEnum } from '../helper'

const DeploymentStatus = zEnum([
  'BUILDING',
  'CRASHED',
  'DEPLOYING',
  'FAILED',
  'INITIALIZING',
  'NEEDS_APPROVAL',
  'QUEUED',
  'REMOVED',
  'REMOVING',
  'SKIPPED',
  'SLEEPING',
  'SUCCESS',
  'WAITING',
])

const GetDeploymentsInput = z.object({
  projectId: z.string().optional(),
  environmentId: z.string().optional(),
  serviceId: z.string().optional(),
  includeDeleted: z.boolean().optional(),
  status: z.object({
    in: DeploymentStatus.optional(),
    notIn: DeploymentStatus.optional(),
  })
    .optional(),
})

/**
 * Get deployments for a service
 * @param input - The input parameters
 * @param input.projectId - (Optional) The ID of the project
 * @param input.environmentId - (Optional) The ID of the environment
 * @param input.serviceId - (Optional) The ID of the service
 * @param input.includeDeleted - (Optional) Whether to include deleted deployments
 * @param input.status - (Optional) Filter deployments by status
 * @param input.status.in - (Optional) Array of statuses to include
 * @param input.status.notIn - (Optional) Array of statuses to exclude
 */
async function list(input: z.input<typeof GetDeploymentsInput>) {
  const validated = GetDeploymentsInput.parse(input)

  interface Response {
    deployments: {
      edges: Array<{
        node: {
          id: string
          canRedeploy: boolean
          canRollback: boolean
          createdAt: string
          deploymentStopped: boolean
          environmentId: string
          meta: any | null
          projectId: string
          serviceId: string | null
          snapshotId: string | null
          staticUrl: string | null
          status: string
          statusUpdatedAt: string | null
          suggestAddServiceDomain: boolean
          updatedAt: string
          url: string | null
        }
      }>
    }
  }

  const response = await graphQLRequest<Response>(`
    query {
      deployments(input: ${graphQLifyObject(validated)}) {
        edges {
          node {
            id
            canRedeploy
            canRollback
            createdAt
            deploymentStopped
            environmentId
            meta
            projectId
            serviceId
            snapshotId
            staticUrl
            status
            statusUpdatedAt
            suggestAddServiceDomain
            updatedAt
            url
          }
        }
      }
    }
  `)

  return response.deployments.edges.map(edge => edge.node)
}

/**
 * Cancel a deployment
 * @param deploymentId - The ID of the deployment to cancel
 */
async function cancel(deploymentId: string) {
  interface Response {
    deploymentCancel: boolean
  }

  const response = await graphQLRequest<Response>(`
    mutation {
      deploymentCancel(id: "${deploymentId}")
    }
  `)

  return response.deploymentCancel
}

/**
 * Create a deployment
 * @param input - The input parameters
 * @param input.environmentId - The ID of the environment
 * @param input.serviceId - The ID of the service
 * @param input.commitSha - The commit SHA to deploy
 */
async function create(input: {
  environmentId: string
  serviceId: string
  commitSha?: string
}) {
  interface Response {
    data: {
      deploymentCreate: boolean
    }
  }

  const params = {
    environmentId: input.environmentId,
    serviceId: input.serviceId,
    commitSha: input.commitSha,
    ...(input.commitSha ? { latestCommit: !input.commitSha } : {}),
  }

  const response = await graphQLRequest<Response>(`
    mutation {
      deploymentCreate(input: ${graphQLifyObject(params)})
    }
  `)

  return response.data.deploymentCreate
}

export default {
  list,
  cancel,
  create,
}
