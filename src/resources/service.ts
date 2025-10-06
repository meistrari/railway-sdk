/**
 * Manage Railway services
 * @module service
 */
import graphQLRequest from '../helper'

/**
 * Get a service by ID
 * @param serviceId - The ID of the service to get
 * @returns The service
 */
export async function getById(serviceId: string) {
  interface Response {
    service: {
      id: string
      name: string
    }
  }

  const service = await graphQLRequest<Response>(`
    query MyQuery {
      service(id: "${serviceId}") {
        id
        name
      }
    }
  `)

  return service.service
}

/**
 * Get domains for a service in an environment
 * @param input - The input parameters
 * @param input.projectId - The ID of the project
 * @param input.environmentId - The ID of the environment
 * @param input.serviceId - The ID of the service
 * @returns The custom and service domains
 */
async function getDomains(input: {
  projectId: string
  environmentId: string
  serviceId: string
}) {
  interface Domain {
    domain: string
  }
  interface Response {
    domains: {
      customDomains: Domain[]
      serviceDomains: Domain[]
    }
  }

  const response = await graphQLRequest<Response>(`
    query MyQuery {
      domains(projectId: "${input.projectId}", environmentId: "${input.environmentId}", serviceId: "${input.serviceId}") {
        customDomains {
          domain
        }
        serviceDomains {
          domain
        }
      }
    }
  `)

  return {
    customDomain: response.domains.customDomains[0]?.domain || null,
    serviceDomain: response.domains.serviceDomains[0]?.domain || null,
  }
}

/**
 * Create a service domain
 * @param input - The input parameters
 * @param input.environmentId - The ID of the environment
 * @param input.serviceId - The ID of the service
 * @param input.targetPort - The target port for the domain
 * @returns The created domain
 */
async function createDomain(input: {
  environmentId: string
  serviceId: string
  targetPort: number
}) {
  interface Response {
    serviceDomainCreate: {
      domain: string
    }
  }

  const response = await graphQLRequest<Response>(`
    mutation MyMutation {
      serviceDomainCreate(input: {
        environmentId: "${input.environmentId}",
        serviceId: "${input.serviceId}",
        targetPort: ${input.targetPort}
      }) {
        domain
      }
    }
  `)

  return response.serviceDomainCreate.domain
}

/**
 * Get all service instances for an environment
 * @param input - The input parameters
 * @param input.environmentId - The ID of the environment
 * @returns Array of service instances with their domains
 */
async function getForEnvironment(input: {
  environmentId: string
}) {
  interface Response {
    data: {
      environment: {
        serviceInstances: {
          edges: Array<{
            node: {
              serviceName: string
              serviceId: string
              domains: {
                customDomains: Array<{
                  domain: string
                }>
                serviceDomains: Array<{
                  domain: string
                }>
              }
            }
          }>
        }
      }
    }
  }

  const response = await graphQLRequest<Response>(`
      query MyQuery {
        environment(id: "${input.environmentId}") {
          serviceInstances {
            edges {
              node {
                serviceName
                serviceId
                domains {
                  customDomains {
                    domain
                  },
                  serviceDomains {
                    domain
                  }
                }
              }
            }
          }
        }
      }
  `)

  return response.data.environment.serviceInstances.edges.map(edge => ({
    serviceName: edge.node.serviceName,
    serviceId: edge.node.serviceId,
    domains: edge.node.domains,
  }))
}

export default {
  getById,
  getDomains,
  createDomain,
  getForEnvironment,
}
