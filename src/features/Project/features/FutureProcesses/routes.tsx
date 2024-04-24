import { lazy } from 'react'
import loadable from 'components/Loadable'
import { PROJECT_PATH, relativePath } from 'Project/util'
import {
  CREATE_SURVEY,
  DEADLINE_SURVEY,
  FILL_FUTURE_PROCESS_PRESENTATION,
  GENERIC_UPDATE_SURVEY,
  LIST_SELECTED_FUTURE_PROCESS,
  LIST_SURVEYS,
  VIEW_FUTURE_PROCESS_PRESENTATION,
  VIEW_SELECTED_FUTURE_PROCESS,
  VIEW_SURVEY,
} from 'permissions'

// dashboard routing
const FutureProcessesList = loadable(
  lazy(
    async () =>
      await import(
        'Project/features/FutureProcesses/screen/FutureProcessesList/FutureProcessesList.tsx'
      )
  )
)

const FutureProcessesSurveysList = loadable(
  lazy(
    async () => await import('Project/features/FutureProcesses/screen/FutureProcessesSurveysList')
  )
)

const FutureProcessesSurveyCreation = loadable(
  lazy(
    async () =>
      await import('Project/features/FutureProcesses/screen/FutureProcessesSurveyCreation')
  )
)

const FutureProcessesSurveyEdition = loadable(
  lazy(
    async () => await import('Project/features/FutureProcesses/screen/FutureProcessesSurveyEdition')
  )
)

const FutureProcessesSurveyConfigurations = loadable(
  lazy(
    async () =>
      await import('Project/features/FutureProcesses/screen/FutureProcessesSurveyConfigurations')
  )
)

const FutureProcessesDetails = loadable(
  lazy(async () => await import('Project/features/FutureProcesses/screen/FutureProcessesDetails'))
)

const FutureProcessesPresentation = loadable(
  lazy(
    async () => await import('Project/features/FutureProcesses/screen/FutureProcessesPresentation')
  )
)

const FutureProcessesAnswersList = loadable(
  lazy(
    async () => await import('Project/features/FutureProcesses/screen/FutureProcessesAnswersList')
  )
)

const FutureProcessesSurveyAnswer = loadable(
  lazy(
    async () => await import('Project/features/FutureProcesses/screen/FutureProcessesSurveyAnswer')
  )
)

export const FUTURE_PROCESSES_PATHS = {
  LIST: `${PROJECT_PATH}future-processes`,
  SURVEYS: `${PROJECT_PATH}future-processes/surveys`,
  SURVEY_CREATION: `${PROJECT_PATH}future-processes/surveys/create`,
  SURVEY_EDITION: `${PROJECT_PATH}future-processes/surveys/:surveyId/edit`,
  SURVEY_CONFIGURATIONS: `${PROJECT_PATH}future-processes/surveys/:surveyId/configurations`,
  DETAILS: `${PROJECT_PATH}future-processes/details/:futureProcessId`,
  EDIT_PRESENTATION: `${PROJECT_PATH}future-processes/presentation/:futureProcessId/edit`,
  VIEW_PRESENTATION: `${PROJECT_PATH}future-processes/presentation/:futureProcessId/view`,
  ANSWERS: `${PROJECT_PATH}future-processes/surveys/:surveyId/answers`,
  SURVEY_ANSWER: `${PROJECT_PATH}future-processes/surveys/:surveyId/answers/:answerId`,
}

const FutureProcessesRoutes = [
  {
    path: relativePath('LIST', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesList />,
    permissions: [LIST_SELECTED_FUTURE_PROCESS],
  },
  {
    path: relativePath('DETAILS', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesDetails />,
    permissions: [VIEW_SELECTED_FUTURE_PROCESS],
  },
  {
    path: relativePath('EDIT_PRESENTATION', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesPresentation />,
    permissions: [FILL_FUTURE_PROCESS_PRESENTATION, VIEW_FUTURE_PROCESS_PRESENTATION],
  },
  {
    path: relativePath('VIEW_PRESENTATION', FUTURE_PROCESSES_PATHS),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    element: <FutureProcessesPresentation mode="view" />,
    permissions: [VIEW_FUTURE_PROCESS_PRESENTATION],
  },
  {
    path: relativePath('SURVEYS', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesSurveysList />,
    permissions: [LIST_SURVEYS],
  },
  {
    path: relativePath('SURVEY_CREATION', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesSurveyCreation />,
    permissions: [CREATE_SURVEY],
  },
  {
    path: relativePath('SURVEY_EDITION', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesSurveyEdition />,
    permissions: [GENERIC_UPDATE_SURVEY, VIEW_SURVEY],
  },
  {
    path: relativePath('SURVEY_CONFIGURATIONS', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesSurveyConfigurations />,
    permissions: [DEADLINE_SURVEY, VIEW_SURVEY],
  },
  {
    path: relativePath('ANSWERS', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesAnswersList />,
  },
  {
    path: relativePath('SURVEY_ANSWER', FUTURE_PROCESSES_PATHS),
    element: <FutureProcessesSurveyAnswer />,
  },
]

export default FutureProcessesRoutes
