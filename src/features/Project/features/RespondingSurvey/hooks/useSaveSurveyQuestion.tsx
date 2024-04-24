import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import config from 'config'
import useProject from 'Project/hooks/useProject'

interface useSaveSurveyQuestionProps {
  loading: boolean
  save: (data: any) => Promise<any>
  error: RequestError
  refresh: () => void
}

const useSaveSurveyQuestion = (
  surveyId: string = '',
  onSuccess: () => void
): useSaveSurveyQuestionProps => {
  const { t } = useTranslation('features', { keyPrefix: 'RespondingSurvey' })
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const { project } = useProject()

  const { retry, loading, error, doFetch } = useFetch(
    `${config.api.msSurveys.baseUrl}/projects/${project?.id}/surveys/${surveyId}/respondings`,
    { method: 'POST' }
  )

  const save = async (data: any): Promise<any> => {
    return await doFetch({ data })
      .then(async () => {
        onSuccess()
        return await Promise.resolve(true)
      })
      .catch(async (e: any) => {
        return await Promise.reject(e)
      })
  }

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

export default useSaveSurveyQuestion
