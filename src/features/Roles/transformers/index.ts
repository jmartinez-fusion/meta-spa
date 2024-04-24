import dayjs from 'dayjs'
import { type Role, type RoleEdition, type RoleFromApi, type RoleToApi } from '../types/rolesTypes'

export const roleFromApi = ({ id, name, createdAt, permissions = [] }: RoleFromApi): Role => {
  return {
    id,
    name,
    createdAt: dayjs(createdAt),
    permissions,
    canBeDeleted: id !== '1',
  }
}

export const roleToApi = ({ name, permissions }: RoleEdition): RoleToApi => {
  return {
    name,
    permissions,
  }
}

export const roleEdition = (role?: Role): RoleEdition => {
  return {
    name: role?.name ?? '',
    permissions: role?.permissions.map((permission) => permission.id) ?? [],
  }
}
