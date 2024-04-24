import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import { projectFromApi } from 'Projects/transformers'
import { type Project } from 'Projects/types'

interface UseFetchProjectDetailProps {
  id?: string
}

interface UseFetchProjectDetailReturn {
  project?: any
  loading: boolean
  error: RequestError
}

const useFetchProjectDetail = ({ id }: UseFetchProjectDetailProps): UseFetchProjectDetailReturn => {
  const [project, setProject] = useState<Project | null>(null)
  const { t } = useTranslation('common')
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProjects.baseUrl}/projects/${id}`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setProject(projectFromApi(response.data))
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

  const isLoading = useMemo(() => loading || project === undefined, [loading, project])

  return { project, loading: isLoading, error }
}

export default useFetchProjectDetail
