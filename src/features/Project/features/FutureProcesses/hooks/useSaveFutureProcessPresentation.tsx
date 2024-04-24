import { useEffect } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import useProject from 'Project/hooks/useProject'
import { type AllowedPresentationStep } from 'Project/features/PresentationTool/types'

interface useSaveFutureProcessPresentationProps {
  futureProcessSteps?: AllowedPresentationStep[]
  loading: boolean
  save: (steps: AllowedPresentationStep[]) => void
  error: RequestError
  refresh: () => void
}

const useSaveFutureProcessPresentation = (
  id: string = '',
  refresh: () => void
): useSaveFutureProcessPresentationProps => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()

  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/future-process-presentations/${id}`,
    { method: 'POST' }
  )

  const save = (steps: AllowedPresentationStep[]): void => {
    void doFetch({ data: steps.map((step) => step.asJson) })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('presentationSavedSuccessfully'), {
      preventDuplicate: false,
      variant: 'success',
      autoHideDuration: 2000,
    })

    refresh()
  }, [response, t, refresh])

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

    refresh()
  }, [error, t, refresh])

  return { loading, error, refresh: retry, save }
}

export default useSaveFutureProcessPresentation
