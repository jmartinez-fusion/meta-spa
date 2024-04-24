import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import { type CurrentProcessesStatus } from 'Project/features/CurrentProcesses/types'
import useProject from 'Project/hooks/useProject'

interface useFetchCurrentProcessesStatusProps {
  currentProcessesStatus?: CurrentProcessesStatus[]
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchCurrentProcessesStatus = (): useFetchCurrentProcessesStatusProps => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [currentProcessesStatus, setCurrentProcessesStatus] = useState<
    CurrentProcessesStatus[] | undefined
  >(undefined)
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProcesses.baseUrl}/current-processes/status`
  )

  useEffect(() => {
    if (!response) return

    const currentProcessesStatus = response.data.map(
      (currentProcessesStatus: CurrentProcessesStatus[]) => currentProcessesStatus
    )

    setCurrentProcessesStatus(currentProcessesStatus)
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

  return { currentProcessesStatus, loading, error, refresh: retry }
}

export default useFetchCurrentProcessesStatus
