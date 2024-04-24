import { useEffect, useState } from 'react'
import usePaginatedFetch from 'src/hooks/usePaginatedFetch'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { type RequestError } from 'src/hooks/useFetch.ts'
import { type Paginator } from 'src/types/paginator'
import { type Filters } from 'src/types/filter'
import { type Sorter } from 'src/types/sorter'
import { type Role, type RoleFromApi } from 'src/features/Roles/types/rolesTypes'
import { roleFromApi } from 'src/features/Roles/transformers'

interface UseFetchRolesResponse {
  roles: Role[] | null
  paginator: Paginator
  loading: boolean
  error: RequestError
  refresh: () => void
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
}

const useFetchRoles = (filters: Filters): UseFetchRolesResponse => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [roles, setRoles] = useState<Role[] | null>(null)
  const { retry, response, paginator, loading, error, sorter, setSorter } = usePaginatedFetch({
    url: `${config.api.msAuth.baseUrl}/roles`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const roles = response.data.map((role: RoleFromApi) => roleFromApi(role))

    setRoles(roles)
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

  return { roles, paginator, loading, error, refresh: retry, sorter, setSorter }
}

export default useFetchRoles
