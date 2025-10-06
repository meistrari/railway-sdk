/**
 * Manage Railway services
 * @module service
 */
import graphQLRequest from '../helper'

/**
 * Get a service by ID
 * @param {string} serviceId - The ID of the service to get
 * @returns {Promise<object>} The service
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
