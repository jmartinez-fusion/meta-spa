import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'hooks/useFetch'
import config from 'config'
import useProject from 'Project/hooks/useProject.ts'
import { type SurveyDetail } from 'Project/features/Surveys/types'
import { surveyDetailFromApi } from 'Project/features/Surveys/transformers'

interface UseFetchSurveyDetailDetailProps {
  id?: string
}

interface UseFetchSurveyDetailDetailReturn {
  surveyDetail?: SurveyDetail
  loading: boolean
  error: RequestError
}

const useFetchSurveyDetail = ({
  id,
}: UseFetchSurveyDetailDetailProps): UseFetchSurveyDetailDetailReturn => {
  const [surveyDetail, setSurveyDetail] = useState<SurveyDetail | undefined>(undefined)
  const { t } = useTranslation('common')
  const { project } = useProject()
  const { response, doFetch, retry, loading, error } = useFetch(
    `${config.api.msSurveys.baseUrl}/projects/${project?.id}/surveys/${id}`
  )
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    void doFetch()
  }, [])

  useEffect(() => {
    if (!response) return

    setSurveyDetail(surveyDetailFromApi(response.data))
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

  const isLoading = useMemo(() => loading || surveyDetail === undefined, [loading, surveyDetail])

  return { surveyDetail, loading: isLoading, error }
}

export default useFetchSurveyDetail
