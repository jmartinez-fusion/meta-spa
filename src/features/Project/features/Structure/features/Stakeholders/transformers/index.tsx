import {
  type Stakeholder,
  type StakeholderDetail,
  type StakeholderDetailFromApi,
  type StakeholderFiltersToApi,
  type StakeholderFromApi,
} from 'Project/features/Structure/features/Stakeholders/types'
import dayjs from 'dayjs'

export const filtersToApi = (data: any = {}): StakeholderFiltersToApi => {
  const {
    stakeholder,
    departments,
    positions,
    hasDepartment,
    isManager,
    updatedAtFrom,
    updatedAtTo,
    projectRole,
  } = data

  return {
    stakeholder,
    departments: departments?.map((department: any) => department.value).join(','),
    positions: positions?.map((position: any) => position.value).join(','),
    hasDepartment,
    isManager,
    updatedAtFrom: updatedAtFrom ? updatedAtFrom.toISOString() : undefined,
    updatedAtTo: updatedAtTo ? updatedAtTo.toISOString() : undefined,
    projectRole,
  }
}

export const stakeholderDetailFromApi = (data: StakeholderDetailFromApi): StakeholderDetail => {
  const { id, name, email, departments, code, updatedAt, isUser, projectRole } = data

  return {
    id,
    name,
    email,
    departments,
    code,
    updatedAt: dayjs(updatedAt),
    isUser,
    projectRole,
  }
}

export const stakeholderFromApi = (data: StakeholderFromApi): Stakeholder => {
  const { id, name, email, positions, departments, code, updatedAt, projectRole } = data

  return {
    id,
    name,
    email,
    positions,
    departments,
    code,
    updatedAt: dayjs(updatedAt),
    projectRole,
  }
}
