import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import { type ProcessMapping } from 'Project/features/ProcessMapping/types'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { processMappingFromApi } from 'Project/features/ProcessMapping/transformers'
import { type ProcessMappingPath } from 'Project/features/ProcessMapping/components/ProcessMappingBreadcrumbs/types'

interface UseFetchProcessMappingProps {
  filters: Filters
}

interface UseFetchProcessMappingReturn {
  processMappings: ProcessMapping[] | null
  processMappingsPath: ProcessMappingPath[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchProcessMapping = ({
  filters,
}: UseFetchProcessMappingProps): UseFetchProcessMappingReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [processMappings, setProcessMappings] = useState(null)
  const [processMappingsPath, setProcessMappingsPath] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msProcesses.baseUrl}/projects/${project?.id}/process-mappings`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const processMappings = response.data.map((processMapping: ProcessMapping[]) =>
      processMappingFromApi(processMapping)
    )
    setProcessMappings(processMappings)

    const processMappingsPath = response.path.map(
      (processMappingPath: ProcessMappingPath) => processMappingPath
    )

    setProcessMappingsPath(processMappingsPath)
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
    processMappings,
    processMappingsPath,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchProcessMapping
