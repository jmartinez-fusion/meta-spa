import { type Dayjs } from 'dayjs'

export interface Department {
  id: string
  name: string
  parent?: Department | null
  updatedAt?: Dayjs
  code?: string
  subDepartments?: Department[]
  createdAt?: Dayjs
}

export interface DepartmentFromApi {
  id: string
  name: string
  parent: DepartmentFromApi | null
  updatedAt?: string
  code?: string
  children?: DepartmentFromApi[]
  createdAt?: string
}

export interface DepartmentFiltersToApi {
  department?: string
  parentDepartment?: string
}
