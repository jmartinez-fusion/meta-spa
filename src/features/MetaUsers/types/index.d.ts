import { type Dayjs } from 'dayjs'
import { type Role } from 'Roles/types/rolesTypes'

export interface FiltersToApi {
  email: string
  name: string
  status: string
  'roles[]': Role[]
}

export interface MetaUser {
  id: string
  email: string
  name: string
  status: string
  roles: Role[]
  createdAt: Dayjs | null
}

export interface MetaUserFromApi {
  id: string
  email: string
  name: string
  status: string
  roles: Role[]
  createdAt: Dayjs | null
}

export interface MetaUserFormValues {
  email: string
  name: string
  roles: string[]
}

export interface MetaUserToApi {
  name: string
  email: string
  roles: string[]
}
