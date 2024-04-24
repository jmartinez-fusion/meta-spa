import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import {
  type Position,
  type PositionFromApi,
} from 'Project/features/Structure/features/Positions/types'
import { positionFromApi } from 'Project/features/Structure/features/Positions/transformers'

interface UseFetchPositionsProps {
  filters: Filters
}

interface UseFetchPositionsReturn {
  positions: Position[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchPositions = ({ filters }: UseFetchPositionsProps): UseFetchPositionsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [positions, setPositions] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/positions`,
    filters,
    defaultSorter: { fieldName: 'parent', order: 'asc' },
  })

  useEffect(() => {
    if (!response) return

    const positions = response.data.map((position: PositionFromApi) => positionFromApi(position))
    setPositions(positions)
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
    positions,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchPositions
