import { useMemo } from 'react'

type QueryValue = string | number | boolean | undefined | string[]

type QueryParams = Record<string, QueryValue>

const useDynamicUrl = (baseUrl: string, path: string, queryParams: QueryParams): string => {
  const generateUrl = (): string => {
    const queryParamsString = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&')
        } else {
          return `${key}=${encodeURIComponent(value as string)}`
        }
      })
      .join('&')

    return `${baseUrl}${path}${queryParamsString ? `?${queryParamsString}` : ''}`
  }

  return useMemo(generateUrl, [baseUrl, path, queryParams])
}

export default useDynamicUrl
