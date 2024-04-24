import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import { type FutureProcess } from 'Project/features/FutureProcesses/types'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { type FutureProcessPath } from 'Project/features/FutureProcesses/components/FutureProcessesBreadcrumbs/types'

interface UseFetchFutureProcessesProps {
  filters: Filters
}

interface UseFetchFutureProcessesReturn {
  futureProcesses: FutureProcess[] | null
  futureProcessesPath: FutureProcessPath[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchFutureProcesses = ({
  filters,
}: UseFetchFutureProcessesProps): UseFetchFutureProcessesReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [futureProcesses, setFutureProcesses] = useState(null)
  const [futureProcessesPath, setFutureProcessesPath] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msProcesses.baseUrl}/projects/${project?.id}/selected-future-process`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const futureProcesses = response.data.map((futureProcess: any) => futureProcess)
    setFutureProcesses(futureProcesses)

    const futureProcessesPath = response.path.map(
      (futureProcessPath: FutureProcessPath) => futureProcessPath
    )

    setFutureProcessesPath(futureProcessesPath)
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
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return {
    futureProcesses,
    futureProcessesPath,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchFutureProcesses
