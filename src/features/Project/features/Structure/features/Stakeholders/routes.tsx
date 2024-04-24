import { lazy } from 'react'
import loadable from 'components/Loadable'
import { LIST_STAKEHOLDERS, VIEW_STAKEHOLDERS } from 'permissions'
import { STRUCTURE_PATH, structurePath } from 'Project/features/Structure/util.ts'

// dashboard routing
const StakeholdersList = loadable(
  lazy(
    async () =>
      await import(
        'src/features/Project/features/Structure/features/Stakeholders/screen/StakeholdersList'
      )
  )
)

const StakeholderDetail = loadable(
  lazy(
    async () =>
      await import(
        'src/features/Project/features/Structure/features/Stakeholders/screen/StakeholderDetail'
      )
  )
)

export const STAKEHOLDERS_PATHS = {
  LIST: `${STRUCTURE_PATH}stakeholders`,
  DETAILS: `${STRUCTURE_PATH}stakeholders/:stakeholderId`,
}

const StakeholdersRoutes = [
  {
    path: structurePath('LIST', STAKEHOLDERS_PATHS),
    element: <StakeholdersList />,
    permissions: [LIST_STAKEHOLDERS],
  },
  {
    path: structurePath('DETAILS', STAKEHOLDERS_PATHS),
    element: <StakeholderDetail />,
    permissions: [VIEW_STAKEHOLDERS],
  },
]

export default StakeholdersRoutes
