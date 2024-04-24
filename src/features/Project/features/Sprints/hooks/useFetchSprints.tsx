import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch.ts'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { type Sprint } from 'Project/features/Sprints/types'
import { sprintFromApi } from 'Project/features/Sprints/transformers'
import useProject from 'Project/hooks/useProject.ts'

interface UseFetchSprintsProps {
  filters: Filters
}

interface UseFetchSprintsReturn {
  sprints: Sprint[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchSprints = ({ filters }: UseFetchSprintsProps): UseFetchSprintsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [sprints, setSprints] = useState(null)
  const { project } = useProject()
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/sprints`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const sprints = response.data.map((sprint: any) => sprintFromApi(sprint))

    setSprints(sprints)
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

  return { sprints, paginator, sorter, setSorter, loading, error, refresh: retry }
}

export default useFetchSprints
