import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from 'config'

interface UseFetchProjectRolesReturn {
  projectRoles?: any
  loading: boolean
  refresh: (options?: { isPollingFetch?: boolean }) => void
  error: RequestError
}

const useFetchProjectRoles = (): UseFetchProjectRolesReturn => {
  const [projectRoles, setProjectRoles] = useState<any | null>(null)
  const { t } = useTranslation('common')
  const { response, doFetch, loading, error, retry } = useFetch(
    `${config.api.msProjects.baseUrl}/project-roles`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setProjectRoles(response.data)
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
        >
          {t('retry')}
        </div>
      ),
    })
  }, [error, t])

  const isLoading = useMemo(() => loading || projectRoles === undefined, [loading, projectRoles])

  return { projectRoles, loading: isLoading, error, refresh: retry }
}

export default useFetchProjectRoles
