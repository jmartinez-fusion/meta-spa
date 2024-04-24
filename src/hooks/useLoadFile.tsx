import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

interface LoadFileFetchProps {
  url: string
  config?: any
  showErrorSnackbar?: boolean
}

export interface UploadFileFetchResult {
  doFetch: (params?: any, options?: { isPollingFetch?: boolean }) => Promise<any>
  retry: () => void
  response: any
  progress?: number
  loading: boolean
  error: any
}

const useLoadFile = ({
  url,
  showErrorSnackbar = true,
}: LoadFileFetchProps): UploadFileFetchResult => {
  const [progress, setProgress] = useState(0)
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { doFetch, retry, response, loading, error } = useFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  const handleDoFetch = async (
    params?: any,
    options?: { isPollingFetch?: boolean }
  ): Promise<any> => {
    setProgress(0)
    let partialProgress = 0
    const interval = setInterval(() => {
      if (partialProgress < 75) {
        partialProgress += 1
        setProgress(partialProgress)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    try {
      const result = await doFetch(params, options)

      clearInterval(interval)
      setProgress(100)

      return result
    } catch (e) {
      setProgress(0)
      clearInterval(interval)
      return await Promise.reject(e)
    }
  }

  useEffect(() => {
    if (!error) return

    if (showErrorSnackbar) {
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
    }
  }, [error, t, showErrorSnackbar])

  return {
    doFetch: handleDoFetch,
    retry,
    response,
    progress,
    loading,
    error,
  }
}

export default useLoadFile
