import { lazy } from 'react'
import loadable from 'components/Loadable'
import { PROJECT_PATH, relativePath } from 'Project/util'
import { CREATE_FUTURE_PROCESS, LIST_FUTURE_PROCESS } from 'permissions'

// dashboard routing
const SelectedProcessesList = loadable(
  lazy(
    async () =>
      await import('Project/features/ProcessSelection/screen/ProcessesList/ProcessesList.tsx')
  )
)
const FutureProcessCreation = loadable(
  lazy(
    async () =>
      await import(
        'Project/features/ProcessSelection/screen/FutureProcessCreation/FutureProcessCreation.tsx'
      )
  )
)

export const PROCESSES_PATHS = {
  LIST: `${PROJECT_PATH}selected-processes`,
  CREATE: `${PROJECT_PATH}selected-processes/create`,
}

const SelectedProcessesRoutes = [
  {
    path: relativePath('LIST', PROCESSES_PATHS),
    element: <SelectedProcessesList />,
    permissions: [LIST_FUTURE_PROCESS],
  },
  {
    path: relativePath('CREATE', PROCESSES_PATHS),
    element: <FutureProcessCreation />,
    permissions: [CREATE_FUTURE_PROCESS],
  },
]

export default SelectedProcessesRoutes
