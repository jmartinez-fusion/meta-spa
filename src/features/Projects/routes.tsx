import { lazy } from 'react'

import Loadable from 'components/Loadable'
import {
  CREATE_PROJECT,
  EDIT_PROJECT_CONFIGURATIONS,
  LIST_PROJECTS,
  UPDATE_PROJECT,
  VIEW_PROJECT,
  VIEW_PROJECT_CONFIGURATIONS,
} from '../../permissions.ts'

export const PROJECTS_PATHS = {
  LIST: '/administration/projects',
  CREATE: '/administration/projects/create',
  EDIT: '/administration/projects/edit/:id',
  DETAILS: '/administration/projects/details/:id',
  ROLES: '/administration/projects/project-roles/:id',
  CONFIGURATIONS: '/administration/projects/settings/:id',
}

const relativePath = (
  path: 'LIST' | 'CREATE' | 'EDIT' | 'DETAILS' | 'ROLES' | 'CONFIGURATIONS'
): string => PROJECTS_PATHS[path].replace('/administration/', '')

// projects routing
const ProjectsList = Loadable(lazy(async () => await import('Projects/screen/ProjectsList')))
const ProjectDetails = Loadable(lazy(async () => await import('Projects/screen/ProjectDetails')))
const ProjectCreation = Loadable(lazy(async () => await import('Projects/screen/ProjectCreation')))
const ProjectEdition = Loadable(lazy(async () => await import('Projects/screen/ProjectEdition')))
const ProjectRoles = Loadable(lazy(async () => await import('Projects/screen/ProjectRoles')))
const ProjectConfigurations = Loadable(
  lazy(async () => await import('Projects/screen/ProjectConfigurations'))
)

const ProjectsRoutes = [
  {
    path: relativePath('LIST'),
    element: <ProjectsList />,
    permissions: [LIST_PROJECTS],
  },
  {
    path: relativePath('CREATE'),
    element: <ProjectCreation />,
    permissions: [CREATE_PROJECT],
  },
  {
    path: relativePath('EDIT'),
    element: <ProjectEdition />,
    permissions: [VIEW_PROJECT, UPDATE_PROJECT],
  },
  {
    path: relativePath('DETAILS'),
    element: <ProjectDetails />,
    permissions: [VIEW_PROJECT],
  },
  {
    path: relativePath('CONFIGURATIONS'),
    element: <ProjectConfigurations />,
    permissions: [EDIT_PROJECT_CONFIGURATIONS, VIEW_PROJECT_CONFIGURATIONS],
  },
  {
    path: relativePath('ROLES'),
    element: <ProjectRoles />,
    permissions: [],
  },
]

export default ProjectsRoutes
