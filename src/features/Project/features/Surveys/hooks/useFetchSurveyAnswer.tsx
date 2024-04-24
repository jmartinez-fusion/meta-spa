import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import useProject from 'Project/hooks/useProject.ts'
import { surveyAnswerFromApi } from 'Project/features/Surveys/transformers'
import { type SurveyAnswer } from 'Project/features/Surveys/types'

interface UseFetchSurveyProps {
  surveyId?: string
  answerId?: string
}

interface UseFetchSurveyReturn {
  surveyAnswer?: SurveyAnswer
  refresh: () => void
  loading: boolean
  error: RequestError
}

const useFetchSurveyAnswer = ({
  surveyId,
  answerId,
}: UseFetchSurveyProps): UseFetchSurveyReturn => {
  const [surveyAnswer, setSurveyAnswer] = useState<SurveyAnswer | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msSurveys.baseUrl}/projects/${project?.id}/surveys/${surveyId}/answers/${answerId}`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const refresh = (): void => {
    setSurveyAnswer(undefined)
    void doFetch()
  }

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return
    setSurveyAnswer(surveyAnswerFromApi(response.data))
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

  const isLoading = useMemo(() => loading || surveyAnswer === undefined, [loading, surveyAnswer])

  return { surveyAnswer, loading: isLoading, error, refresh }
}

export default useFetchSurveyAnswer
