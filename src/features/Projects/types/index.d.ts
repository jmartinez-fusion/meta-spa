import { type Dayjs } from 'dayjs'

export interface Client {
  id?: string
  name: string
  industry: Industry
  licenseInformation: string
}

export interface Industry {
  id?: string
  name: string
}

export interface ClientToApi {
  id: string | null
  name: string
  licenseInformation: string
  industry: Industry
}

export type ClientFromApi = Client

export interface FiltersToApi {
  client?: string
  startDateFrom?: string
  startDateTo?: string
  createdAtFrom?: string
  createdAtTo?: string
  dueDateFrom?: string
  industries?: string[]
  dueDateTo?: string
  name?: string
}

export interface Project {
  id: string
  name: string
  industry: string
  client: ClientFromApi
  startDate?: Dayjs
  dueDate?: Dayjs
  logo?: string | null
  licenseInformation?: string | null
  logoImage?: string | null
  createdAt: Dayjs | null
}

export interface ProjectFromApi {
  id: string
  name: string
  client: ClientFromApi
  startDate: string
  dueDate: string
  logo?: string | null
  licenseInformation?: string | null
  createdAt: string | null
}

export interface ProjectUser {
  id: string
  name: string
  projectRole?: { id: string; name: string } | null
}

export interface ProjectUserFromApi {
  id: string
  name: string
  projectRole?: { id: string; name: string } | null
}

export interface ProjectFormValues {
  id?: string
  name: string
  clientId?: string
  industry: string
  client: string
  startDateFrom: string | null | Date
  startDateTo: string | null | Date
  licenseInformation?: string | null
  logo?: string | File | null
}

export interface ProjectToApi {
  client: ClientToApi
  startDate: string
  dueDate: string
  name: string
  logo: string
}

export interface ProjectConfigurations {
  host?: string
  port?: string
  protocol?: string
  password?: string
  username?: string
  senderName?: string
  senderEmailAddress?: string
}

export interface ProjectConfigurationsFromApi {
  host?: string
  port?: string
  protocol?: string
  username?: string
  senderName?: string
  senderEmailAddress?: string
}

export interface ProjectConfigurationsToApi {
  host?: string
  port?: string
  protocol?: string
  username?: string
  password?: string
  senderName?: string
  senderEmailAddress?: string
}
