import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import i18next from 'i18next'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import qs from 'qs'

export type RequestError = FetchError | null

export interface FetchError {
  message: string
  requestError?: any
}

interface UseFetchResult {
  doFetch: (params?: any, options?: { isPollingFetch?: boolean }) => Promise<any>
  doThrottledFetch: (params?: any) => Promise<void>
  response: any
  loading: boolean
  error: RequestError
  resetResponse: () => void
  retry: (options?: { isPollingFetch?: boolean }) => void
}

const convertNullableValuesToEmptyStringWhenMultipartRequest = (requestConfig: any): any => {
  if (
    requestConfig?.data &&
    requestConfig.headers &&
    requestConfig?.headers['Content-Type'] === 'multipart/form-data'
  ) {
    Object.keys(requestConfig.data).forEach((key: string): void => {
      if (requestConfig.data[key] === null || requestConfig.data[key] === undefined) {
        requestConfig.data[key] = ''
      }
    })
  }

  return requestConfig
}

const useFetch = (
  url: string = '',
  config: any = { pollingInterval: undefined },
  debounceWait = 100
): UseFetchResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<RequestError>(null)
  const [lastFetchParams, setLastFetchParams] = useState<any>(null)
  const [response, setResponse] = useState<any>(undefined)
  const { pollingInterval } = config

  const resetResponse = useCallback(() => {
    setResponse(undefined)
  }, [setResponse])

  /** This function returns a promise for chain function purposes. TODO: Evaluate a refactor. */
  const doFetch = useCallback(
    async (params = {}, options: any = { isPollingFetch: undefined }) => {
      const { isPollingFetch } = options

      setLoading(!isPollingFetch)
      setError(null)
      setResponse(null)
      setLastFetchParams(params)
      const requestConfig = convertNullableValuesToEmptyStringWhenMultipartRequest({
        url,
        ...config,
        ...params,
        paramsSerializer: (params: any) => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })

      try {
        const response = await axios.request(requestConfig)

        setResponse(response.data || {})
        setLoading(false)
        return await Promise.resolve(response.data)
      } catch (err: any) {
        let error = err?.response?.data?.error?.message

        if (!error) {
          if (typeof err?.response?.data?.message === 'string') {
            error = err?.response?.data?.message
          } else {
            error = i18next.t('common:genericError')
          }
        }

        setError({
          message: error,
          requestError: err?.response?.data,
        })
        setLoading(false)
        return await Promise.reject(error)
      }
    },
    [url, JSON.stringify(config)]
  )

  const doThrottledFetch = useCallback(
    async (params: any = {}, options = {}) => {
      setTimeout(async () => (doFetch ? await doFetch(params, options) : null), debounceWait)
    },
    [doFetch]
  )
  const retry = useCallback(
    (options = {}) => {
      void doFetch(lastFetchParams, options)
    },
    [lastFetchParams, doFetch]
  )

  useEffect(() => {
    if (!pollingInterval) return

    const pollingTimer = setInterval(() => {
      retry({ isPollingFetch: true })
    }, pollingInterval)

    return () => {
      if (!pollingInterval) return
      clearInterval(pollingTimer)
    }
  }, [retry, pollingInterval])

  return { doFetch, doThrottledFetch, response, loading, error, retry, resetResponse }
}

export default useFetch
