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

export default {
  getById,
}
