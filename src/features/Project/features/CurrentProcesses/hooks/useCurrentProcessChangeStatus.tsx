import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import config from 'config'
import useProject from 'features/Project/hooks/useProject'

interface UseCurrentProcessChangeStatusReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useCurrentProcessChangeStatus = (
  refresh: () => void
): UseCurrentProcessChangeStatusReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { currentProcessId } = useParams()
  const { response, doFetch, retry, loading, error, resetResponse } = useFetch()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (status: string) => {
      void doFetch({
        url: `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-process-presentations/${currentProcessId}/status/${status}`,
        method: 'PATCH',
      })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    const message = t('editedSuccessfully', {
      type: t('features:CurrentProcesses:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })

    resetResponse()
    refresh()
  }, [response, t, navigate, resetResponse, enqueueSnackbar])

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

export default useCurrentProcessChangeStatus
