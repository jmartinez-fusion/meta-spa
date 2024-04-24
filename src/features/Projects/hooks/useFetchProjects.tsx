import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch.ts'
import { type Project } from 'Projects/types'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { projectFromApi } from 'Projects/transformers'

interface UseFetchProjectsProps {
  filters: Filters
}

interface UseFetchProjectsReturn {
  projects: Project[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchProjects = ({ filters }: UseFetchProjectsProps): UseFetchProjectsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [projects, setProjects] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msProjects.baseUrl}/projects`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const projects = response.data.map((project: any) => projectFromApi(project))

    setProjects(projects)
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

  return { projects, paginator, sorter, setSorter, loading, error, refresh: retry }
}

export default useFetchProjects
