import graphQLRequest, { graphQLifyObject } from '../helper'

async function collectionUpsert(input: {
  environmentId: string
  projectId: string
  /**
   * When set to true, removes all existing variables before upserting the new collection.
   * Default = false
   */
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
