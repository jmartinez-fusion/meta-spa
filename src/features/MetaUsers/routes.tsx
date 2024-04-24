import { lazy } from 'react'
import { CREATE_USERS, LIST_USERS, UPDATE_USERS, VIEW_USERS } from 'permissions'
import Loadable from 'components/Loadable'

export const META_USERS_PATHS = {
  LIST: '/administration/meta-users',
  CREATE: '/administration/meta-users/create',
  EDIT: '/administration/meta-users/edit/:id',
  DETAILS: '/administration/meta-users/details/:id',
}

const relativePath = (path: 'LIST' | 'CREATE' | 'EDIT' | 'DETAILS'): string =>
  META_USERS_PATHS[path].replace('/administration/', '')

// meta users routing
const MetaUsersList = Loadable(lazy(async () => await import('MetaUsers/screen/MetaUsersList')))
const MetaUserDetails = Loadable(lazy(async () => await import('MetaUsers/screen/MetaUserDetails')))
const MetaUserCreation = Loadable(
  lazy(async () => await import('MetaUsers/screen/MetaUserCreation'))
)
const MetaUserEdition = Loadable(lazy(async () => await import('MetaUsers/screen/MetaUserEdition')))

const MetaUsersRoutes = [
  {
    path: relativePath('LIST'),
    element: <MetaUsersList />,
    permissions: LIST_USERS,
  },
  {
    path: relativePath('CREATE'),
    element: <MetaUserCreation />,
    permissions: CREATE_USERS,
  },
  {
    path: relativePath('EDIT'),
    element: <MetaUserEdition />,
    permissions: UPDATE_USERS,
  },
  {
    path: relativePath('DETAILS'),
    element: <MetaUserDetails />,
    permissions: VIEW_USERS,
  },
]

export default MetaUsersRoutes
