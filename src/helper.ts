import type { Primitive } from 'zod'
import { z } from 'zod'

const RAILWAY_TOKEN = z.string().parse(Bun.env.RAILWAY_TOKEN)

const RAILWAY_GRAPHQL_ENDPOINT = 'https://backboard.railway.app/graphql/v2'

async function graphQLRequest<T = unknown>(query: string, logger = console) {
  const response = await fetch(RAILWAY_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RAILWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GraphQL request failed: ${errorText}`)
  }

  const result = await response.json() as { data: T }

  if (!result.data) {
    logger.error('❌ GraphQL request returned null data')
    logger.error(JSON.stringify(result, null, 2))
    throw new Error('GraphQL request returned no data')
  }

  return result.data
}

export default graphQLRequest

export function graphQLifyObject(input: Primitive | Record<string, any>): number | string {
  if (typeof input === 'number') {
    return input
  }

  if (Array.isArray(input)) {
    const props = input.map(value => `${graphQLifyObject(value)}`).join(',')
    return `[${props}]`
  }
  // Stringify everything other than objects.
  if (typeof input === 'object' && input) {
    const data = Object.entries(input).map(([key, value]) => {
      return `${key}:${graphQLifyObject(value)}`
    }).join(',')

    return `{ ${data} }`
  }

  return JSON.stringify(input)
}
