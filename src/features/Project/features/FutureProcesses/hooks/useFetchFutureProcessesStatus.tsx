import { useEffect, useState } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import { type FutureProcessesStatus } from 'Project/features/FutureProcesses/types'
import useProject from 'Project/hooks/useProject'

interface useFetchFutureProcessesStatusProps {
  futureProcessesStatus?: FutureProcessesStatus[]
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchFutureProcessesStatus = (): useFetchFutureProcessesStatusProps => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [futureProcessesStatus, setFutureProcessesStatus] = useState<
    FutureProcessesStatus[] | undefined
  >(undefined)
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProcesses.baseUrl}/selected-future-process/status`
  )

  useEffect(() => {
    if (!response) return

    const futureProcessesStatus = response.data.map(
      (futureProcessesStatus: FutureProcessesStatus[]) => futureProcessesStatus
    )

    setFutureProcessesStatus(futureProcessesStatus)
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

  return { futureProcessesStatus, loading, error, refresh: retry }
}

export default useFetchFutureProcessesStatus
