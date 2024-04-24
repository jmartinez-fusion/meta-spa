import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'src/config'
import { type Filters } from 'types/filter'
import useFetch, { type RequestError } from 'hooks/useFetch'
import { type AnswerFromApi, type Answer } from 'Project/features/Answers/types'
import { answerFromApi } from 'Project/features/Answers/transformers'
import useProject from 'Project/hooks/useProject'
import { useParams } from 'react-router-dom'
import useDynamicUrl from 'hooks/useDynamicUrl'

interface UseFetchAnswersProps {
  filters: Filters
}

interface UseFetchAnswersReturn {
  answers: Answer[] | null
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchAnswers = ({ filters }: UseFetchAnswersProps): UseFetchAnswersReturn => {
  const { t } = useTranslation()
  const { project } = useProject()
  const { surveyId } = useParams()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [answers, setAnswers] = useState<Answer[] | null>(null)

  const url = useDynamicUrl(
    config.api.msSurveys.baseUrl,
    `/projects/${project?.id}/surveys/${surveyId}/answers`,
    filters
  )

  const { retry, response, loading, error, doFetch } = useFetch(url, {
    method: 'GET',
  })

  useEffect(() => {
    void doFetch()
  }, [doFetch])

  useEffect(() => {
    if (!response) return

    const fetchedAnswers = response.data.map((answer: AnswerFromApi) => answerFromApi(answer))
    setAnswers(fetchedAnswers)
  }, [response?.data])

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
  }, [error, t, enqueueSnackbar, retry, closeSnackbar])

  const refresh = (): void => {
    retry()
  }

  return { answers, loading, error, refresh }
}

export default useFetchAnswers
