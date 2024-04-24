import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch.ts'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { type ClientUser } from 'Project/features/ClientUsers/types'
import { clientUserFromApi } from 'Project/features/ClientUsers/transformers'
import useProject from 'Project/hooks/useProject.ts'

interface UseFetchClientUsersProps {
  filters: Filters
}

interface UseFetchClientUsersReturn {
  clientUsers: ClientUser[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchClientUsers = ({ filters }: UseFetchClientUsersProps): UseFetchClientUsersReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()
  const [clientUsers, setClientUsers] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msOrganization.baseUrl}/projects/${project?.id}/stakeholders`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const clientUsers = response.data.map((clientUser: any) => clientUserFromApi(clientUser))

    setClientUsers(clientUsers)
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

  return { clientUsers, paginator, sorter, setSorter, loading, error, refresh: retry }
}

export default useFetchClientUsers
