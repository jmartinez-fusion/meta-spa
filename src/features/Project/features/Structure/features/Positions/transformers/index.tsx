import dayjs from 'dayjs'
import {
  type Position,
  type PositionFiltersToApi,
  type PositionFromApi,
} from 'Project/features/Structure/features/Positions/types'

export const filtersToApi = (data: any = {}): PositionFiltersToApi => {
  const { code, name, updatedAtFrom, updatedAtTo } = data

  return {
    code,
    name,
    updatedAtFrom: updatedAtFrom ? updatedAtFrom.toISOString() : undefined,
    updatedAtTo: updatedAtTo ? updatedAtTo.toISOString() : undefined,
  }
}

export const positionFromApi = (data: PositionFromApi): Position => {
  const { id, name, updatedAt, code } = data

  return {
    id,
    name,
    updatedAt: dayjs(updatedAt),
    code,
  }
}
