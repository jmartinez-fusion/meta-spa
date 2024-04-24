import { lazy } from 'react'
import Loadable from 'components/Loadable'
import { relativePath } from 'Project/util.ts'

export const CLIENT_USERS_PATHS = {
  LIST: 'administration/client-users',
  DETAILS: 'administration/client-users/details/:id',
}

// meta users routing
const ClientUsersList = Loadable(
  lazy(async () => await import('Project/features/ClientUsers/screen/ClientUsersList'))
)
// const MetaUserDetails = Loadable(lazy(async () => await import('ClientUsers/screen/MetaUserDetails')))

const ClientUsersRoutes = [
  {
    path: relativePath('LIST', CLIENT_USERS_PATHS),
    element: <ClientUsersList />,
  },
  // {
  //   path: relativePath('DETAILS'),
  //   element: <MetaUserDetails />,
  //   permissions: VIEW_USERS,
  // },
]

export default ClientUsersRoutes
