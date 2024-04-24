import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import useProject from 'Project/hooks/useProject.ts'
import { surveyFromApi } from 'Project/features/RespondingSurvey/transformers'
import { type RespondingSurvey } from 'Project/features/RespondingSurvey/types'

interface UseFetchSurveyProps {
  id?: string
}

interface UseFetchSurveyReturn {
  survey?: RespondingSurvey
  refresh: () => void
  loading: boolean
  error: RequestError
}

const useFetchSurvey = ({ id }: UseFetchSurveyProps): UseFetchSurveyReturn => {
  const [survey, setSurvey] = useState<RespondingSurvey | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msSurveys.baseUrl}/projects/${project?.id}/surveys/${id}/respondings`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const refresh = (): void => {
    setSurvey(undefined)
    void doFetch()
  }

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return
    setSurvey(surveyFromApi(response.data))
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

  const isLoading = useMemo(() => loading || survey === undefined, [loading, survey])

  return { survey, loading: isLoading, error, refresh }
}

export default useFetchSurvey
