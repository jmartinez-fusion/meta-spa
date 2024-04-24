import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import config from 'config'
import { projectUserFromApi } from 'Projects/transformers'
import { type ProjectUser, type ProjectUserFromApi } from 'Projects/types'

interface UseFetchProjectUsersProps {
  id?: string
}

interface UseFetchProjectUsersReturn {
  projectUsers?: {
    selected: ProjectUser[]
    unselected: ProjectUser[]
  }
  loading: boolean
  refresh: (options?: { isPollingFetch?: boolean }) => void
  error: RequestError
}

const useFetchProjectUsers = ({ id }: UseFetchProjectUsersProps): UseFetchProjectUsersReturn => {
  const [projectUsers, setProjectUsers] = useState<any | null>(null)
  const { t } = useTranslation('common')
  const { response, doFetch, loading, error, retry } = useFetch(
    `${config.api.msProjects.baseUrl}/projects/${id}/users`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setProjectUsers({
      selected: response.data.selected.map((selectedMetaUser: ProjectUserFromApi) =>
        projectUserFromApi(selectedMetaUser)
      ),
      unselected: response.data.unselected.map((unselectedMetaUser: ProjectUserFromApi) =>
        projectUserFromApi(unselectedMetaUser)
      ),
    })
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

  const isLoading = useMemo(() => loading || projectUsers === undefined, [loading, projectUsers])

  return { projectUsers, loading: isLoading, error, refresh: retry }
}

export default useFetchProjectUsers
