import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import { projectConfigurationsFromApi } from 'Projects/transformers'
import { type ProjectConfigurations } from 'Projects/types'

interface UseFetchProjectConfigurationsProps {
  id?: string
}

interface UseFetchProjectConfigurationsReturn {
  projectConfigurations?: ProjectConfigurations
  loading: boolean
  error: RequestError
}

const useFetchProjectConfigurations = ({
  id,
}: UseFetchProjectConfigurationsProps): UseFetchProjectConfigurationsReturn => {
  const [projectConfigurations, setProjectConfigurations] = useState<
    ProjectConfigurations | undefined
  >(undefined)
  const { t } = useTranslation('common')
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProjects.baseUrl}/projects/${id}/mail-settings`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setProjectConfigurations(projectConfigurationsFromApi(response.data || undefined))
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

  const isLoading = useMemo(
    () => loading || projectConfigurations === undefined,
    [loading, projectConfigurations]
  )

  return { projectConfigurations, loading: isLoading, error }
}

export default useFetchProjectConfigurations
