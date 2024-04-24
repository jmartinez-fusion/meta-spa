import {
  type MetaUserToApi,
  type MetaUser,
  type MetaUserFromApi,
  type FiltersToApi,
  type MetaUserFormValues,
} from 'MetaUsers/types'
import dayjs from 'dayjs'

export const metaUserFromApi = ({
  id,
  name,
  email,
  roles,
  status,
  createdAt,
}: MetaUserFromApi): MetaUser => {
  return {
    id,
    name,
    email,
    roles,
    status,
    createdAt: dayjs(createdAt),
  }
}

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { name, email, roles = [], status } = data

  return {
    name,
    email,
    'roles[]': roles,
    status,
  }
}

export const metaUserToAPI = (data: any = {}): MetaUserToApi => {
  const { name, email, roles } = data

  return {
    name,
    email,
    roles,
  }
}

export const metaUserToInitialValues = (data: any = {}): MetaUserFormValues => {
  const { name, email, roles } = data

  return {
    name,
    email,
    roles: roles.map((role: any) => role.id),
  }
}
