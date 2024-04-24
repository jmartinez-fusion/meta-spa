import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import useFetch from 'hooks/useFetch'
import config from 'config'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes'
import useProject from 'features/Project/hooks/useProject'

interface UseFutureProcessChangeStatusReturn {
  onSubmit: (data: any) => void
  isSubmitting: boolean
}

const useFutureProcessChangeStatus = (refresh: () => void): UseFutureProcessChangeStatusReturn => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { futureProcessId } = useParams()
  const { response, doFetch, retry, loading, error } = useFetch()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSubmit = useCallback(
    (status: string) => {
      void doFetch({
        url: `${config.api.msProcesses.baseUrl}/projects/${project?.id}/selected-future-process/${futureProcessId}/status/${status}`,
        method: 'PATCH',
      })
    },
    [doFetch]
  )

  useEffect(() => {
    if (!response) return

    navigate(
      FUTURE_PROCESSES_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
        ':futureProcessId',
        futureProcessId ?? ''
      )
    )

    const message = t('editedSuccessfully', {
      type: t('features:FutureProcesses:singular'),
    })

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })

    refresh()
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

export default useFutureProcessChangeStatus
