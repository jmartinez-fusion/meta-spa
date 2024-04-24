import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import { type CurrentProcess } from 'Project/features/CurrentProcesses/types'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { currentProcessFromApi } from 'Project/features/CurrentProcesses/transformers'
import { type OptionConfig } from 'utils/entityToOptions'

interface UseFetchCurrentProcessesProps {
  filters: Filters
}

interface UseFetchCurrentProcessesReturn {
  currentProcesses: CurrentProcess[] | null
  currentProcessesList: OptionConfig[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchCurrentProcesses = ({
  filters,
}: UseFetchCurrentProcessesProps): UseFetchCurrentProcessesReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [currentProcesses, setCurrentProcesses] = useState(null)
  const [currentProcessesList, setCurrentProcessesList] = useState<OptionConfig[] | null>(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-processes`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const currentProcesses = response.data.map((currentProcess: any) =>
      currentProcessFromApi(currentProcess)
    )
    setCurrentProcesses(currentProcesses)
    setCurrentProcessesList(
      currentProcesses.map(({ id, currentProcess }: { id: string; currentProcess: any }) => ({
        id,
        currentProcess,
      }))
    )
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
    currentProcesses,
    currentProcessesList,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchCurrentProcesses
