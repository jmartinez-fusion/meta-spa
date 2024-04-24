import config from 'src/config.tsx'
import useFetch, { type RequestError } from 'src/hooks/useFetch.js'

interface UseLogoutFetchResult {
  doLogout: () => Promise<any>
  loading: boolean
  error: RequestError
}

export default function useLoginFetch(): UseLogoutFetchResult {
  const { doFetch, error, loading } = useFetch(`${config.api.msAuth.baseUrl}/auth/logout`, {
    method: 'POST',
  })

  const doLogout = async (): Promise<any> => {
    try {
      await doFetch()

      await Promise.resolve()
    } catch (err) {
      await Promise.reject(err)
    }
  }

  return { doLogout, loading, error }
}
