import config from 'src/config.tsx'
import useFetch, { type RequestError } from 'src/hooks/useFetch'
import Session from 'src/features/Auth/models/Session'

// This will be used when refresh token necessary
interface UseRefreshFetchResult {
  doRefresh: () => Promise<Session>
  loading: boolean
  error: RequestError
}
export default function useRefresh(session: Session | null): UseRefreshFetchResult {
  const { doFetch, error, loading } = useFetch(`${config.api.msAuth.baseUrl}/auth/refresh`, {
    method: 'POST',
  })

  const doRefresh = async (): Promise<Session> => {
    try {
      const response = await doFetch({
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.refreshToken}` },
      })

      return Session.fromAPI(response)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return { doRefresh, loading, error }
}
