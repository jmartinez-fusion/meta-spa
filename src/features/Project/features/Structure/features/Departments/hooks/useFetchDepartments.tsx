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
  type Department,
  type DepartmentFromApi,
} from 'Project/features/Structure/features/Departments/types'
import { departmentFromApi } from 'Project/features/Structure/features/Departments/transformers'

interface UseFetchDepartmentsProps {
  filters: Filters
}

interface UseFetchDepartmentsReturn {
  departments: Department[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchDepartments = ({ filters }: UseFetchDepartmentsProps): UseFetchDepartmentsReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [departments, setDepartments] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/departments`,
    filters,
    defaultSorter: { fieldName: 'parent', order: 'asc' },
  })

  useEffect(() => {
    if (!response) return

    const departments = response.data.map((department: DepartmentFromApi) =>
      departmentFromApi(department)
    )
    setDepartments(departments)
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
    departments,
    paginator,
    sorter,
    setSorter,
    loading,
    error,
    refresh: retry,
  }
}

export default useFetchDepartments
