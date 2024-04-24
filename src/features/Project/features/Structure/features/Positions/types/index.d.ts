import { type Dayjs } from 'dayjs'

export interface Position {
  id: string
  name: string
  updatedAt?: Dayjs
  code?: string
}

export interface PositionFromApi {
  id: string
  name: string
  updatedAt?: string
  code?: string
}

export interface PositionFiltersToApi {
  name?: string
  code?: string
  updatedAtFrom?: string
  updatedAtTo?: string
}
