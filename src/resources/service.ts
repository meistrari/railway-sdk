import graphQLRequest from '../helper'

async function getById(serviceId: string) {
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

export default {
  getById,
  getDomains,
}
