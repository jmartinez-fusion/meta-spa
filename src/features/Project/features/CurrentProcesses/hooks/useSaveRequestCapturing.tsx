import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch from 'src/hooks/useFetch'
import config from 'src/config'
import { useNavigate } from 'react-router-dom'
import useProject from 'Project/hooks/useProject.ts'

interface UseSaveSelection {
  onSave: (selectedProcessIds: string[]) => void
  isSaving: boolean
}

const useSaveRequestCapturing = (
  initialSelectedCurrentProcessIds: string[],
  refresh: () => void
): UseSaveSelection => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses.requestCapturing' })
  const navigate = useNavigate()
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/current-processes/request-capturing`,
    {
      method: 'POST',
    }
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const onSave = useCallback(
    (currentSelectedProcessIds: string[]) => {
      void doFetch({
        data: {
          processes: currentSelectedProcessIds,
        },
      }).then(() => {
        refresh()
      })
    },
    [doFetch, project, initialSelectedCurrentProcessIds]
  )

  useEffect(() => {
    if (!response) return

    const message = t('surveysSent')

    enqueueSnackbar(message, {
      preventDuplicate: false,
      variant: 'success',
    })
  }, [response, t, navigate, enqueueSnackbar])

  useEffect(() => {
    if (!error) return

    enqueueSnackbar(error?.message, {
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

  return { onSave, isSaving: loading }
}

export default useSaveRequestCapturing
