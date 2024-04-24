import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import Session from 'features/Auth/models/Session'
import useBrowserStorage from 'hooks/useBrowserStorage'

interface UseLoginWithSignatureFetchResult {
  doLogin: (signature: string) => Promise<Session>
  loading: boolean
  error: RequestError
}

export default function useLoginWithSignatureFetch(): UseLoginWithSignatureFetchResult {
  const browserStorage = useBrowserStorage('metaData')
  const { doFetch, error, loading } = useFetch(
    `${config.api.msAuth.baseUrl}/signed-urls/authenticate-by-url`,
    {
      method: 'POST',
    }
  )

  const doLogin = async (url: string): Promise<Session> => {
    try {
      const { data } = await doFetch({
        data: {
          url,
        },
      })

      browserStorage.persist(data?.metadata)

      return Session.fromAPI({
        ...data,
        accessToken: data?.userData?.accessToken,
        data: data?.userData?.user,
      })
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return { doLogin, loading, error }
}
