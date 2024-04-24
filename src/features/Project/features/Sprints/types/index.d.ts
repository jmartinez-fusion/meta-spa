import { type Dayjs } from 'dayjs'

export interface FiltersToApi {
  sprint: string
  startDate: string
  endDate: string
}

export interface Sprint {
  id: string
  name: string
  code: string
  startDate: Dayjs
  dueDate: Dayjs
}

export interface SprintFromApi {
  id: string
  name: string
  code: string
  startDate: string
  dueDate: string
}

export interface SprintFormValues {
  name: string
  code: string
  startDate?: Date
  dueDate?: Date
}

export interface SprintToApi {
  name: string
  code: string
  startDate: string
  endDate: string
}
