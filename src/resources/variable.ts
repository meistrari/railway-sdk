/**
 * Manage Railway variables
 * @module variable
 */
import graphQLRequest, { graphQLifyObject } from '../helper'

/**
 * Upsert a variable collection
 * @param {object} input - The input parameters
 * @param {string} input.environmentId - The ID of the environment
 * @param {string} input.projectId - The ID of the project
 * @param {boolean} input.replace - When set to true, removes all existing variables before upserting the new collection.
 * @param {string} input.serviceId - The ID of the service
 * @param {Record<string, string>} input.variables - The variables to upsert
 */
export async function collectionUpsert(input: {
  environmentId: string
  projectId: string
  replace?: boolean
  serviceId?: string
  variables: Record<string, string>
}) {
  interface Response {
    variableCollectionUpsert: boolean
  }
  const variable = await graphQLRequest<Response>(`
    mutation MyMutation {
      variableCollectionUpsert(input: ${graphQLifyObject(input)})
    }
  `)

  if (!variable.variableCollectionUpsert) {
    throw new Error('Failed to upsert variable collection')
  }
}

export default {
  collectionUpsert,
}
