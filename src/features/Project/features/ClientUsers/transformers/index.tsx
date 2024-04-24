import dayjs from 'dayjs'
import {
  type ClientUser,
  type ClientUserFromApi,
  type FiltersToApi,
} from 'Project/features/ClientUsers/types'

export const clientUserFromApi = ({
  id,
  name,
  email,
  createdAt,
}: ClientUserFromApi): ClientUser => {
  return {
    id,
    name,
    email,
    createdAt: dayjs(createdAt),
  }
}

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { name } = data

  return {
    stakeholder: name,
  }
}
