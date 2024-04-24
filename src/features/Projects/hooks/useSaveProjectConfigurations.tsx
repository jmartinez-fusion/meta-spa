import { useEffect } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import { useNavigate } from 'react-router-dom'
import { PROJECTS_PATHS } from 'Projects/routes.tsx'

interface UseSaveProjectConfigurationsProps {
  loading: boolean
  save: (data: any) => void
  error: RequestError
  refresh: () => void
}

const useSaveProjectConfigurations = (id: string = ''): UseSaveProjectConfigurationsProps => {
  const navigate = useNavigate()
  const { t } = useTranslation('features', { keyPrefix: 'Projects.projectConfigurations' })
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProjects.baseUrl}/projects/${id}/mail-settings`,
    { method: 'POST' }
  )

  const save = (data: any): void => {
    void doFetch({ data })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('configurationsSavedSuccessfully'), {
      preventDuplicate: false,
      variant: 'success',
      autoHideDuration: 2000,
    })

    navigate(PROJECTS_PATHS.LIST)
  }, [response, navigate, t])

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

  return { loading, error, refresh: retry, save }
}

export default useSaveProjectConfigurations
