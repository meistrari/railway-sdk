import type { Primitive } from 'zod'
import { z } from 'zod'

const RAILWAY_TOKEN = z.string().parse(Bun.env.RAILWAY_TOKEN)

const RAILWAY_GRAPHQL_ENDPOINT = 'https://backboard.railway.app/graphql/v2'

export class RailwayRequestError extends Error {
  constructor(public readonly response: Response) {
    super(`Railway API request failed with status ${response.status}`)
  }
}

async function graphQLRequest<T = unknown>(query: string, variables: Record<string, any> = {}) {
  const response = await fetch(RAILWAY_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RAILWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    console.error('❌ GraphQL request failed')
    console.error(query, JSON.stringify(variables, null, 2), await response.text())
    throw new RailwayRequestError(response)
  }

  const result = await response.json() as { data: T, errors?: any }

  if (result.errors) {
    console.error('❌ GraphQL request returned errors')
    console.error(query)
    console.error(JSON.stringify(result.errors, null, 2))
    throw new Error('GraphQL request returned errors')
  }

  if (!result.data) {
    console.error('❌ GraphQL request returned null data')
    console.error(query)
    console.error(JSON.stringify(result, null, 2))
    throw new Error('GraphQL request returned no data')
  }

  return result.data
}

export default graphQLRequest

export class Enum {
  constructor(public readonly values: string[]) {
  }

  toGraphQL() {
    return `[${this.values.join(',')}]`
  }
}

export function zEnum<T extends string>(values: readonly [T, ...T[]]) {
  return z.array(z.enum(values)).transform(values => new Enum(values))
}

export function graphQLifyObject(input: Primitive | Record<string, any>): number | string {
  if (typeof input === 'number') {
    return input
  }

  if (input instanceof Enum) {
    return input.toGraphQL()
  }

  if (Array.isArray(input)) {
    const props = input.map(value => `${graphQLifyObject(value)}`).join(',')
    return `[${props}]`
  }
  // Stringify everything other than objects.
  if (typeof input === 'object' && input) {
    const data = Object.entries(input).map(([key, value]) => {
      return `${key}: ${graphQLifyObject(value)}`
    }).join(',')

    return `{ ${data} }`
  }

  return JSON.stringify(input)
}

export function graphQLifyInputs(input: Record<string, any>): string {
  return Object.entries(input).map(([key, rawValue]) => {
    const getValue = () => {
      if (typeof rawValue === 'string') {
        if (rawValue.startsWith('$')) {
          return rawValue
        }

        return `"${rawValue}"`
      }

      return graphQLifyObject(rawValue)
    }

    return `${key}: ${getValue()}`
  }).join(', ')
}
