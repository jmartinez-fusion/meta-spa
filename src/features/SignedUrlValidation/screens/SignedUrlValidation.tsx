import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingRing from 'components/LoadingRing'
import useAuth from 'features/Auth/hooks/useAuth'
import { RESPONDING_SURVEY_PATH } from 'Project/features/RespondingSurvey/routes'
import useBrowserStorage from 'hooks/useBrowserStorage'

const SignedUrlValidation = (): ReactNode => {
  const { isAuthenticated, isLoading } = useAuth()
  const browserStorage = useBrowserStorage('metaData')
  const { projectId, surveyId } = browserStorage.get()
  const navigate = useNavigate()

  if (!isAuthenticated || isLoading) {
    return <LoadingRing center />
  }

  setTimeout(() => {
    navigate(
      RESPONDING_SURVEY_PATH.BASE.replace(':projectId', projectId ?? '').replace(
        ':surveyId',
        surveyId ?? ''
      )
    )
  }, 1000)
}

export default SignedUrlValidation
