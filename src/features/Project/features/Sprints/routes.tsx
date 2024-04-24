import { lazy } from 'react'
import { CREATE_SPRINTS, LIST_SPRINTS, UPDATE_SPRINTS, VIEW_SPRINTS } from 'permissions'
import Loadable from 'components/Loadable'
import { PROJECT_PATH, relativePath } from 'Project/util.ts'

export const SPRINTS_PATHS = {
  LIST: `${PROJECT_PATH}sprints`,
  CREATE: `${PROJECT_PATH}sprints/create`,
  EDIT: `${PROJECT_PATH}sprints/edit/:id`,
  DETAILS: `${PROJECT_PATH}sprints/details/:id`,
}

// meta users routing
const SprintsList = Loadable(
  lazy(async () => await import('Project/features/Sprints/screen/SprintsList'))
)
const SprintDetails = Loadable(
  lazy(async () => await import('Project/features/Sprints/screen/SprintDetails'))
)
const SprintCreation = Loadable(
  lazy(async () => await import('Project/features/Sprints/screen/SprintCreation'))
)
const SprintEdition = Loadable(
  lazy(async () => await import('Project/features/Sprints/screen/SprintEdition'))
)

const SprintsRoutes = [
  {
    path: relativePath('LIST', SPRINTS_PATHS),
    element: <SprintsList />,
    permissions: LIST_SPRINTS,
  },
  {
    path: relativePath('CREATE', SPRINTS_PATHS),
    element: <SprintCreation />,
    permissions: CREATE_SPRINTS,
  },
  {
    path: relativePath('EDIT', SPRINTS_PATHS),
    element: <SprintEdition />,
    permissions: [UPDATE_SPRINTS, VIEW_SPRINTS],
  },
  {
    path: relativePath('DETAILS', SPRINTS_PATHS),
    element: <SprintDetails />,
    permissions: VIEW_SPRINTS,
  },
]

export default SprintsRoutes
