import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import { type Filters } from 'types/filter'
import { type Paginator } from 'types/paginator'
import { type Sorter } from 'types/sorter'
import { type RequestError } from 'hooks/useFetch.ts'
import { type MetaUser } from 'MetaUsers/types'
import usePaginatedFetch from 'hooks/usePaginatedFetch'
import { metaUserFromApi } from 'MetaUsers/transformers'

interface UseFetchMetaUsersProps {
  filters: Filters
}

interface UseFetchMetaUsersReturn {
  metaUsers: MetaUser[] | null
  paginator: Paginator
  loading: boolean
  sorter?: Sorter
  setSorter: (fieldName: string, order: 'asc' | 'desc' | undefined) => void
  error: RequestError
  refresh: () => void
}

const useFetchMetaUsers = ({ filters }: UseFetchMetaUsersProps): UseFetchMetaUsersReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [metaUsers, setMetaUsers] = useState(null)
  const { retry, response, paginator, sorter, setSorter, loading, error } = usePaginatedFetch({
    url: `${config.api.msAuth.baseUrl}/meta-users`,
    filters,
  })

  useEffect(() => {
    if (!response) return

    const metaUsers = response.data.map((metaUser: any) => metaUserFromApi(metaUser))

    setMetaUsers(metaUsers)
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

  return { metaUsers, paginator, sorter, setSorter, loading, error, refresh: retry }
}

export default useFetchMetaUsers
