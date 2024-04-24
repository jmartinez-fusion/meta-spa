import { type Dayjs } from 'dayjs'

export interface FiltersToApi {
  stakeholder: string
}

export interface ClientUser {
  id: string
  email: string
  name: string
  createdAt: Dayjs | null
}

export interface ClientUserFromApi {
  id: string
  email: string
  name: string
  createdAt: Dayjs | null
}

export interface ClientUserFormValues {
  email: string
  name: string
}

export interface ClientUserToApi {
  name: string
  email: string
}
