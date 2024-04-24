import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import useProject from 'Project/hooks/useProject.ts'
import {
  type CurrentProcessRequestCapturing,
  type CurrentProcessRequestCapturingFromApi,
} from 'Project/features/CurrentProcesses/types'
import { currentProcessRequestCapturingFromApi } from 'Project/features/CurrentProcesses/transformers'

interface UseFetchFutureProcesses {
  currentProcesses?: CurrentProcessRequestCapturing[]
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchCurrentProcessesRequestCapturing = (): UseFetchFutureProcesses => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [currentProcesses, setCurrentProcesses] = useState<
    CurrentProcessRequestCapturing[] | undefined
  >(undefined)
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-processes/request-capturing`
  )

  useEffect(() => {
    if (!response) return

    const currentProcesses = response.data.map(
      (currentProcessRequestCapturing: CurrentProcessRequestCapturingFromApi) =>
        currentProcessRequestCapturingFromApi(currentProcessRequestCapturing)
    )

    setCurrentProcesses(currentProcesses)
  }, [response?.data, t])

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

  useEffect(() => {
    if (project?.id) {
      void doFetch()
    }
  }, [project])

  return { currentProcesses, loading, error, refresh: retry }
}

export default useFetchCurrentProcessesRequestCapturing
