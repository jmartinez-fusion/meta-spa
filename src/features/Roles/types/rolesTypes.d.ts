import { type Dayjs } from 'dayjs'
import { type PermissionFromAPIType } from 'src/features/Auth/types'
import type Permission from 'src/features/Auth/models/Permission.ts'

export interface Role {
  id: string
  name: string
  createdAt?: Dayjs | null
  canBeDeleted?: boolean
  permissions: Permission[]
}

export interface RoleFromApi {
  id: string
  name: string
  createdAt: string | null
  permissions: PermissionFromAPIType[]
}

export interface RoleEdition {
  name: string
  permissions: string[] // ids
}

export type RoleToApi = RoleEdition
