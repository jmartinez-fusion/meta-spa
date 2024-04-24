import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import { type CurrentProcess } from 'Project/features/CurrentProcesses/types'
import { currentProcessFromApi } from 'Project/features/CurrentProcesses/transformers'
import useProject from 'features/Project/hooks/useProject'
import config from 'src/config.tsx'

interface UseFetchCurrentProcessProps {
  id?: string | null
}

interface UseFetchCurrentProcessReturn {
  currentProcess?: CurrentProcess | undefined
  loading: boolean
  refresh: () => void
  error: RequestError
}

const useFetchCurrentProcess = ({
  id,
}: UseFetchCurrentProcessProps): UseFetchCurrentProcessReturn => {
  const [currentProcess, setCurrentProcess] = useState<CurrentProcess | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-processes/${id}`
  )

  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (id) {
      void doFetch()
    }
  }, [id])

  const refresh = useCallback(() => {
    setCurrentProcess(undefined)
    void doFetch()
  }, [setCurrentProcess])

  useEffect(() => {
    if (!response) return

    setCurrentProcess(currentProcessFromApi(response.data))
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
        >
          {t('retry')}
        </div>
      ),
    })
  }, [error, t])

  const isLoading = useMemo(
    () => loading || currentProcess === undefined,
    [loading, currentProcess]
  )

  return { currentProcess, loading: isLoading, error, refresh }
}

export default useFetchCurrentProcess
