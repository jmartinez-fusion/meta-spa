import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import useAuth from 'features/Auth/hooks/useAuth.ts'

interface UseFetchGenerateSignedUrlProps {
  signedUrl?: string
  loading: boolean
  generateSignedUrl: (params?: any, options?: { isPollingFetch?: boolean }) => Promise<any>
  error: RequestError
  refresh: () => void
}

const useFetchGenerateSignedUrl = (metadata: any): UseFetchGenerateSignedUrlProps => {
  const { t } = useTranslation()
  const { session } = useAuth()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [signedUrl, setSignedUrl] = useState<string | undefined>(undefined)
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msAuth.baseUrl}/signed-urls/generate`,
    {
      method: 'POST',
      data: { metadata, userEmail: session?.user.email },
    }
  )

  useEffect(() => {
    if (!response) return

    setSignedUrl(response.url)
  }, [response, t])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error.message, {
      preventDuplicate: true,
      variant: 'error',
      autoHideDuration: 2000,
      action: (
        <div
          onClick={() => {
            retry()
            closeSnackbar()
          }}
        />
      ),
    })
  }, [error, t])

  return { signedUrl, loading, generateSignedUrl: doFetch, error, refresh: retry }
}

export default useFetchGenerateSignedUrl
