import {
  type SprintToApi,
  type Sprint,
  type SprintFromApi,
  type FiltersToApi,
  type SprintFormValues,
} from 'Project/features/Sprints/types'
import dayjs from 'dayjs'

export const sprintFromApi = ({ id, name, code, startDate, dueDate }: SprintFromApi): Sprint => {
  return {
    id,
    name,
    code,
    startDate: dayjs(startDate),
    dueDate: dayjs(dueDate),
  }
}

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { sprint, startDate, endDate } = data

  return {
    sprint,
    startDate: startDate ? startDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : undefined,
  }
}

export const sprintToAPI = (data: any = {}): SprintToApi => {
  const { name, code, startDate, dueDate } = data

  return {
    name,
    code,
    startDate: startDate ? startDate.toISOString() : undefined,
    endDate: dueDate ? dueDate.toISOString() : undefined,
  }
}

export const sprintToFormValues = (data: Sprint): SprintFormValues => {
  const { code, name, startDate, dueDate } = data

  return {
    name,
    startDate: new Date(startDate.toISOString()),
    dueDate: new Date(dueDate.toISOString()),
    code,
  }
}
