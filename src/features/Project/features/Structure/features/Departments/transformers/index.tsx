import dayjs from 'dayjs'
import {
  type Department,
  type DepartmentFiltersToApi,
  type DepartmentFromApi,
} from 'Project/features/Structure/features/Departments/types'

export const filtersToApi = (data: any = {}): DepartmentFiltersToApi => {
  const { parentName, name } = data

  return {
    parentDepartment: parentName,
    department: name,
  }
}

export const departmentFromApi = (data: DepartmentFromApi): Department => {
  const { id, name, parent, updatedAt, code, children = [], createdAt } = data

  return {
    id,
    name,
    parent: parent ? departmentFromApi(parent) : undefined,
    updatedAt: dayjs(updatedAt),
    code,
    subDepartments: children?.map((child) => departmentFromApi(child)),
    createdAt: dayjs(createdAt),
  }
}
