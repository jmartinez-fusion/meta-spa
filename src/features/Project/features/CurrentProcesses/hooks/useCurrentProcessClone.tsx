import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import useProject from 'Project/hooks/useProject'
import config from 'config'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes'

interface UseCurrentProcessCreationReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useCurrentProcessClone = (cloneCurrentProcessId: string): UseCurrentProcessCreationReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-processes/clone`,
    {
      method: 'PUT',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (data: any) => {
      void doFetch({ ...data, cloneCurrentProcessId }).then((response) => {
        if (data.submitAndRedirect) {
          navigate(
            CURRENT_PROCESSES_PATHS.VIEW_PRESENTATION.replace(
              ':projectId',
              project?.id ?? ''
            ).replace(':currentProcessId', response?.data?.id)
          )
        } else {
          navigate(CURRENT_PROCESSES_PATHS.LIST.replace(':projectId', project?.id ?? ''))
        }
      })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    const message = t('createdSuccessfully', {
      name: response.data.name,
      type: t('features:CurrentProcesses:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, navigate, enqueueSnackbar])

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
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  return { onSubmit, isSubmitting: loading }
}

export default useCurrentProcessClone
