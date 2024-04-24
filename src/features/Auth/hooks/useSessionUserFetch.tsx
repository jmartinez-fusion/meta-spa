import config from 'src/config.tsx'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import AuthUser from 'src/features/Auth/models/AuthUser'

interface UseSessionUserFetchType {
  getSessionUser: () => Promise<Awaited<any>>
  isLoadingSessionUser: boolean
  error: RequestError
}

export default function useSessionUserFetch(): UseSessionUserFetchType {
  const { doFetch, error, loading } = useFetch(`${config.api.msAuth.baseUrl}/auth/me`, {
    method: 'GET',
  })

  const getSessionUser = async (): Promise<Awaited<any>> => {
    try {
      const { data } = await doFetch()
      const user = AuthUser.fromAPI(data?.data || data)

      return await Promise.resolve(user)
    } catch (err) {
      return await Promise.reject(err)
    }
  }

  return { getSessionUser, isLoadingSessionUser: loading, error }
}
