import { lazy } from 'react'
import Loadable from 'components/Loadable'
import { PROJECT_PUBLIC_PATH, projectPublicPath } from 'Project/util'

export const RESPONDING_SURVEY_PATH = {
  BASE: `${PROJECT_PUBLIC_PATH}responding/:surveyId`,
}

const RespondingSurvey = Loadable(
  lazy(
    async () =>
      await import('Project/features/RespondingSurvey/screen/RespondingSurvey/RespondingSurvey')
  )
)

const RespondingSurveyRoutes = [
  {
    path: projectPublicPath('BASE', RESPONDING_SURVEY_PATH),
    element: <RespondingSurvey />,
  },
]

export default RespondingSurveyRoutes
