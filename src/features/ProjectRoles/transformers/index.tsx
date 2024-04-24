import { type ProjectRole, type ProjectRoleFromApi } from 'features/ProjectRoles/types'

export const projectRoleFromApi = ({ id, name }: ProjectRoleFromApi): ProjectRole => {
  return {
    id,
    name,
  }
}
