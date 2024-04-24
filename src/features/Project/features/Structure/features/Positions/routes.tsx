import { lazy } from 'react'
import loadable from 'components/Loadable'
import { LIST_POSITIONS } from 'permissions'
import { STRUCTURE_PATH, structurePath } from 'Project/features/Structure/util.ts'

// dashboard routing
const PositionsList = loadable(
  lazy(
    async () =>
      await import(
        'src/features/Project/features/Structure/features/Positions/screen/PositionsList'
      )
  )
)

export const POSITIONS_PATHS = {
  LIST: `${STRUCTURE_PATH}positions`,
}

const PositionsRoutes = [
  {
    path: structurePath('LIST', POSITIONS_PATHS),
    element: <PositionsList />,
    permissions: [LIST_POSITIONS],
  },
]

export default PositionsRoutes
