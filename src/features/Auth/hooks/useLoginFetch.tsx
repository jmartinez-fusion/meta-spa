import config from 'src/config.tsx'
import useFetch, { type RequestError } from 'src/hooks/useFetch'

interface UseLoginFetchResult {
  doLogin: (email: string, password: string) => Promise<any>
  loading: boolean
  error: RequestError
}

export default function useLoginFetch(): UseLoginFetchResult {
  const { doFetch, error, loading } = useFetch(`${config.api.msAuth.baseUrl}/auth/login`, {
    method: 'POST',
  })

  const doLogin = async (email: string, password: string): Promise<any> => {
    try {
      await doFetch({
        data: {
          email,
          password,
          platform: config.api.platform,
        },
      })

      return await Promise.resolve(true)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return { doLogin, loading, error }
}
