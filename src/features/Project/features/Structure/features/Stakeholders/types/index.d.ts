import { type Dayjs } from 'dayjs'

export interface StakeholderDepartment {
  id: string
  name: string
  manager: boolean
}

export interface ProjectRole {
  id: string
  name: string
}

export interface StakeholderDetailDepartment {
  id: string
  name: string
  manager: boolean
  positions: string[]
}

export interface Stakeholder {
  id: string
  name: string
  code: string
  email: string
  departments: StakeholderDepartment[]
  positions: string[]
  updatedAt: Dayjs
  projectRole?: string | null
}

export interface StakeholderDetail {
  id: string
  name: string
  code: string
  email: string
  isUser: boolean
  departments: StakeholderDetailDepartment[]
  updatedAt: Dayjs
  projectRole?: ProjectRole | string | null
}

export interface StakeholderFromApi {
  id: string
  name: string
  code: string
  email: string
  departments: StakeholderDepartmentFromApi[]
  positions: string[]
  updatedAt: string
  projectRole?: string | null
}

export interface StakeholderDetailFromApi {
  id: string
  name: string
  code: string
  isUser: boolean
  email: string
  departments: StakeholderDetailDepartmentFromApi[]
  updatedAt: string
  projectRole?: ProjectRole | string | null
}

export interface StakeholderDepartmentFromApi {
  id: string
  name: string
  manager: boolean
}

export interface StakeholderDetailDepartmentFromApi {
  id: string
  name: string
  manager: boolean
  positions: string[]
}

export interface StakeholderFiltersToApi {
  stakeholder?: string
  departments?: string
  positions?: string
  isManager?: boolean
  hasDepartment?: boolean
  updatedAtFrom?: string
  updatedAtTo?: string
  projectRole?: string
}
