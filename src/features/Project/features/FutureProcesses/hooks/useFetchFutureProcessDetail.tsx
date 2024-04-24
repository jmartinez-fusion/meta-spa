import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import { type FutureProcessDetail } from 'Project/features/FutureProcesses/types'
import { futureProcessDetailFromApi } from 'Project/features/FutureProcesses/transformers'
import useProject from 'features/Project/hooks/useProject'

interface UseFetchFutureProcessDetailProps {
  id?: string | null
  transformer: (data: any, t: any) => any
}

interface UseFetchFutureProcessDetailReturn {
  futureProcess?: FutureProcessDetail | null
  loading: boolean
  refresh: () => void
  error: RequestError
}

const useFetchFutureProcessDetail = ({
  id,
  transformer,
}: UseFetchFutureProcessDetailProps): UseFetchFutureProcessDetailReturn => {
  const [futureProcess, setFutureProcess] = useState<FutureProcessDetail | null>(null)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/selected-future-process/${id}`
  )

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id) {
      void doFetch()
    }
  }, [id])

  const refresh = useCallback(() => {
    setFutureProcess(null)
    void doFetch()
  }, [setFutureProcess])

  useEffect(() => {
    if (!response) return

    setFutureProcess(futureProcessDetailFromApi(response.data))
  }, [response, transformer, t])

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
        >
          {t('retry')}
        </div>
      ),
    })
  }, [error, t])

  const isLoading = useMemo(() => loading || futureProcess === undefined, [loading, futureProcess])

  return { futureProcess, loading: isLoading, error, refresh }
}

export default useFetchFutureProcessDetail
