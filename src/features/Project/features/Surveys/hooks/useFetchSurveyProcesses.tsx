import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import config from 'config'
import useFetch, { type RequestError } from 'hooks/useFetch.ts'
import useProject from 'Project/hooks/useProject.ts'
import { type SurveyProcess, type SurveyProcessFromApi } from 'Project/features/Surveys/types'
import { surveyProcessFromApi } from 'Project/features/Surveys/transformers'

interface UseFetchSurveyProcessesProps {
  module: 'future_state_process' | 'current_state_process'
}

interface UseFetchSurveyProcessesReturn {
  surveyProcesses?: SurveyProcess[]
  loading: boolean
  error: RequestError
  refresh: () => void
}

const useFetchSurveyProcesses = ({
  module,
}: UseFetchSurveyProcessesProps): UseFetchSurveyProcessesReturn => {
  const { t } = useTranslation()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const [surveyProcesses, setSurveyProcesses] = useState<SurveyProcess[] | undefined>(undefined)
  const { project } = useProject()
  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msProcesses.baseUrl}/projects/${project?.id}/process-steps?type=${module}`
  )

  useEffect(() => {
    if (!response) return

    const surveyProcesses = response.data.map((surveyProcess: SurveyProcessFromApi) =>
      surveyProcessFromApi(surveyProcess)
    )

    setSurveyProcesses(surveyProcesses)
  }, [response?.data, t])

  useEffect(() => {
    void doFetch()
  }, [doFetch])

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

  return { surveyProcesses, loading, error, refresh: retry }
}

export default useFetchSurveyProcesses
