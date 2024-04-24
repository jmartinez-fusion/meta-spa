import { lazy } from 'react'
import loadable from 'components/Loadable'
import { PROJECT_PATH, relativePath } from 'Project/util'
import {
  CLONE_CURRENT_PROCESS,
  CREATE_CURRENT_PROCESS,
  CREATE_SURVEY,
  DEADLINE_SURVEY,
  FILL_CURRENT_PROCESS_PRESENTATION,
  GENERIC_UPDATE_SURVEY,
  LIST_CURRENT_PROCESS,
  LIST_SURVEYS,
  UPDATE_CURRENT_PROCESS,
  VIEW_CURRENT_PROCESS,
  VIEW_CURRENT_PROCESS_PRESENTATION,
  VIEW_SURVEY,
} from 'permissions'

// dashboard routing
const CurrentProcessesList = loadable(
  lazy(
    async () =>
      await import(
        'Project/features/CurrentProcesses/screen/CurrentProcessesList/CurrentProcessesList.tsx'
      )
  )
)

const CurrentProcessDetails = loadable(
  lazy(
    async () => await import('Project/features/CurrentProcesses/screen/CurrentProcessDetails.tsx')
  )
)

const RequestCapturing = loadable(
  lazy(async () => await import('Project/features/CurrentProcesses/screen/RequestCapturing'))
)

const CurrentProcessEdit = loadable(
  lazy(async () => await import('Project/features/CurrentProcesses/screen/CurrentProcessEdit.tsx'))
)

const CurrentProcessClone = loadable(
  lazy(async () => await import('Project/features/CurrentProcesses/screen/CurrentProcessClone.tsx'))
)

const CurrentProcessesPresentation = loadable(
  lazy(
    async () =>
      await import('Project/features/CurrentProcesses/screen/CurrentProcessesPresentation')
  )
)

const CurrentProcessesSurveyCreation = loadable(
  lazy(
    async () =>
      await import('Project/features/CurrentProcesses/screen/CurrentProcessesSurveyCreation')
  )
)

const CurrentProcessesSurveyEdition = loadable(
  lazy(
    async () =>
      await import('Project/features/CurrentProcesses/screen/CurrentProcessesSurveyEdition')
  )
)

const CurrentProcessesSurveyConfigurations = loadable(
  lazy(
    async () =>
      await import('Project/features/CurrentProcesses/screen/CurrentProcessesSurveyConfigurations')
  )
)

const CurrentProcessesCreate = loadable(
  lazy(async () => await import('Project/features/CurrentProcesses/screen/CurrentProcessCreate'))
)

const CurrentProcessesSurveysList = loadable(
  lazy(
    async () => await import('Project/features/CurrentProcesses/screen/CurrentProcessesSurveysList')
  )
)

const CurrentProcessesAnswersList = loadable(
  lazy(
    async () => await import('Project/features/CurrentProcesses/screen/CurrentProcessesAnswersList')
  )
)

const CurrentProcessesSurveyAnswer = loadable(
  lazy(
    async () =>
      await import('Project/features/CurrentProcesses/screen/CurrentProcessesSurveyAnswer')
  )
)

export const CURRENT_PROCESSES_PATHS = {
  LIST: `${PROJECT_PATH}current-processes`,
  CREATE: `${PROJECT_PATH}current-processes/create`,
  REQUEST_CAPTURING: `${PROJECT_PATH}current-processes/request-capturing`,
  EDIT: `${PROJECT_PATH}current-processes/edit/:currentProcessId`,
  DETAILS: `${PROJECT_PATH}current-processes/details/:currentProcessId`,
  CLONE: `${PROJECT_PATH}current-processes/clone/:currentProcessId`,
  SURVEY_CREATION: `${PROJECT_PATH}current-processes/surveys/create`,
  SURVEY_EDITION: `${PROJECT_PATH}current-processes/surveys/:surveyId/edit`,
  SURVEY_CONFIGURATIONS: `${PROJECT_PATH}current-processes/surveys/:surveyId/configurations`,
  EDIT_PRESENTATION: `${PROJECT_PATH}current-processes/presentation/:currentProcessId/edit`,
  VIEW_PRESENTATION: `${PROJECT_PATH}current-processes/presentation/:currentProcessId/view`,
  SURVEYS: `${PROJECT_PATH}current-processes/surveys`,
  ANSWERS: `${PROJECT_PATH}current-processes/surveys/:surveyId/answers`,
  SURVEY_ANSWER: `${PROJECT_PATH}current-processes/surveys/:surveyId/answers/:answerId`,
}

const CurrentProcessesRoutes = [
  {
    path: relativePath('LIST', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessesList />,
    permissions: [LIST_CURRENT_PROCESS],
  },
  {
    path: relativePath('DETAILS', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessDetails />,
    permissions: [VIEW_CURRENT_PROCESS],
  },
  {
    path: relativePath('EDIT', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessEdit />,
    permissions: [UPDATE_CURRENT_PROCESS, VIEW_CURRENT_PROCESS],
  },
  {
    path: relativePath('EDIT_PRESENTATION', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessesPresentation />,
    permissions: [
      VIEW_CURRENT_PROCESS,
      VIEW_CURRENT_PROCESS_PRESENTATION,
      FILL_CURRENT_PROCESS_PRESENTATION,
    ],
  },
  {
    path: relativePath('CLONE', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessClone />,
    permissions: [CLONE_CURRENT_PROCESS, VIEW_CURRENT_PROCESS],
  },
  {
    path: relativePath('VIEW_PRESENTATION', CURRENT_PROCESSES_PATHS),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    element: <CurrentProcessesPresentation mode="view" />,
    permissions: [VIEW_CURRENT_PROCESS, VIEW_CURRENT_PROCESS_PRESENTATION],
  },
  {
    path: relativePath('CREATE', CURRENT_PROCESSES_PATHS),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    element: <CurrentProcessesCreate />,
    permissions: [CREATE_CURRENT_PROCESS],
  },
  {
    path: relativePath('SURVEYS', CURRENT_PROCESSES_PATHS),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    element: <CurrentProcessesSurveysList />,
    permissions: [LIST_SURVEYS],
  },
  {
    path: relativePath('SURVEY_CREATION', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessesSurveyCreation />,
    permissions: [CREATE_SURVEY],
  },
  {
    path: relativePath('SURVEY_EDITION', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessesSurveyEdition />,
    permissions: [GENERIC_UPDATE_SURVEY, VIEW_SURVEY],
  },
  {
    path: relativePath('SURVEY_CONFIGURATIONS', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessesSurveyConfigurations />,
    permissions: [DEADLINE_SURVEY, VIEW_SURVEY],
  },
  {
    path: relativePath('REQUEST_CAPTURING', CURRENT_PROCESSES_PATHS),
    element: <RequestCapturing />,
  },
  {
    path: relativePath('ANSWERS', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessesAnswersList />,
  },
  {
    path: relativePath('SURVEY_ANSWER', CURRENT_PROCESSES_PATHS),
    element: <CurrentProcessesSurveyAnswer />,
  },
]

export default CurrentProcessesRoutes
