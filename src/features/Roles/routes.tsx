import { lazy } from 'react'
import loadable from 'components/Loadable'
import { CREATE_ROLES, LIST_ROLES, UPDATE_ROLES, VIEW_ROLES } from 'src/permissions.ts'

export const ROLES_PATHS = {
  LIST: '/administration/roles',
  CREATE: '/administration/roles/create',
  EDIT: '/administration/roles/edit/:id',
  DETAILS: '/administration/roles/details/:id',
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const relativePath = (path: string): string => ROLES_PATHS[path].replace('/administration/', '')

// dashboard routing
const RolesList = loadable(lazy(async () => await import('src/features/Roles/screen/RolesList')))
const RoleDetails = loadable(
  lazy(async () => await import('src/features/Roles/screen/RoleDetails'))
)
const RoleCreation = loadable(lazy(async () => await import('./screen/RoleCreation.tsx')))
const RoleEdition = loadable(
  lazy(async () => await import('src/features/Roles/screen/RoleEdition'))
)

const RolesRoutes = [
  {
    path: relativePath('LIST'),
    element: <RolesList />,
    permissions: [LIST_ROLES],
  },
  {
    path: relativePath('CREATE'),
    element: <RoleCreation />,
    permissions: [CREATE_ROLES],
  },
  {
    path: relativePath('EDIT'),
    element: <RoleEdition />,
    permissions: [UPDATE_ROLES, VIEW_ROLES],
  },
  {
    path: relativePath('DETAILS'),
    element: <RoleDetails />,
    permissions: [VIEW_ROLES],
  },
]

export default RolesRoutes
