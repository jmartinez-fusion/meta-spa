import { lazy } from 'react'
import loadable from 'components/Loadable'
import { LIST_DEPARTMENTS, VIEW_DEPARTMENT } from 'permissions'
import { STRUCTURE_PATH, structurePath } from 'Project/features/Structure/util.ts'

// dashboard routing
const DepartmentsList = loadable(
  lazy(
    async () =>
      await import(
        'src/features/Project/features/Structure/features/Departments/screen/DepartmentsList'
      )
  )
)

const DepartmentsDetails = loadable(
  lazy(
    async () =>
      await import(
        'src/features/Project/features/Structure/features/Departments/screen/DepartmentDetails'
      )
  )
)

export const DEPARTMENTS_PATHS = {
  LIST: `${STRUCTURE_PATH}departments`,
  DETAILS: `${STRUCTURE_PATH}departments/:departmentId/view`,
}

const DepartmentsRoutes = [
  {
    path: structurePath('LIST', DEPARTMENTS_PATHS),
    element: <DepartmentsList />,
    permissions: [LIST_DEPARTMENTS],
  },
  {
    path: structurePath('DETAILS', DEPARTMENTS_PATHS),
    element: <DepartmentsDetails />,
    permissions: [VIEW_DEPARTMENT],
  },
]

export default DepartmentsRoutes
