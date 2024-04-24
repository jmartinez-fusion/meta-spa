import { useEffect } from 'react'
import config from 'src/config'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import useFetch, { type RequestError } from 'src/hooks/useFetch.ts'
import useProject from 'Project/hooks/useProject'
import { useNavigate } from 'react-router-dom'

interface useSaveSurveyProps {
  loading: boolean
  save: (data: any) => void
  error: RequestError
  refresh: () => void
}

const useSaveSurvey = (goBackPath?: string): useSaveSurveyProps => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { project } = useProject()

  const { retry, response, loading, error, doFetch } = useFetch(
    `${config.api.msSurveys.baseUrl}/projects/${project?.id}/surveys`,
    { method: 'POST' }
  )

  const save = (data: any): void => {
    void doFetch({ data })
  }

  useEffect(() => {
    if (!response) return

    enqueueSnackbar(t('surveySavedSuccessfully'), {
      preventDuplicate: false,
      variant: 'success',
      autoHideDuration: 2000,
    })

    if (goBackPath) {
      navigate(goBackPath)
    }
  }, [response, t, navigate, goBackPath])

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

export default useSaveSurvey
