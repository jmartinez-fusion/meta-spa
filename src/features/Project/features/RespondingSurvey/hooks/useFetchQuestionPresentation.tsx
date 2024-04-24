import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import useProject from 'Project/hooks/useProject.ts'
import { questionProcessFromJson } from 'Project/features/RespondingSurvey/transformers'
import { type QuestionProcess } from 'Project/features/RespondingSurvey/types'

interface UseFetchQuestionPresentationProps {
  module: 'future_state_process' | 'current_state_process'
  startStep?: string
  endStep?: string
  processId?: string
}

interface UseFetchQuestionPresentationReturn {
  process?: QuestionProcess
  loading: boolean
  error: RequestError
}

const useFetchQuestionPresentation = ({
  module,
  processId,
  startStep,
  endStep,
}: UseFetchQuestionPresentationProps): UseFetchQuestionPresentationReturn => {
  const [process, setProcess] = useState<QuestionProcess | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/process-steps/${processId}?type=${module}${startStep ? `&startStep=${startStep}` : ''}${endStep ? `&endStep=${endStep}` : ''}`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (processId && startStep) {
      void doFetch()
    }
  }, [processId])

  useEffect(() => {
    if (!response) return

    setProcess(questionProcessFromJson(response.data))
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

  const isLoading = useMemo(() => loading || process === undefined, [loading, process])

  return { process, loading: isLoading, error }
}

export default useFetchQuestionPresentation
