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

export default {
  getById,
}
