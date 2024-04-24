import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch'
import config from 'src/config'
import { roleFromApi } from '../transformers'
import { type Role } from '../types/rolesTypes'

interface FetchRoleDetailResult {
  role: Role | undefined
  loading: boolean
  error: RequestError
}

export default function useFetchRoleDetail(id: string | undefined): FetchRoleDetailResult {
  const [role, setRole] = useState<Role | undefined>()
  const { t } = useTranslation('common')
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msAuth.baseUrl}/roles/${id}`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setRole(roleFromApi(response.data))
  }, [response, t])

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

  const isLoading = useMemo(() => loading || role === undefined, [loading, role])

  return { role, loading: isLoading, error }
}
