import {
  type ProjectToApi,
  type Project,
  type ProjectFromApi,
  type FiltersToApi,
  type ProjectFormValues,
  type ProjectUserFromApi,
  type ProjectUser,
  type ProjectConfigurationsFromApi,
  type ProjectConfigurations,
  type ProjectConfigurationsToApi,
} from 'Projects/types'
import dayjs from 'dayjs'

export const projectFromApi = ({
  id,
  name,
  client,
  startDate,
  dueDate,
  logo,
  licenseInformation,
  createdAt,
}: ProjectFromApi): Project => {
  return {
    id,
    name,
    industry: client.industry.name,
    client,
    startDate: dayjs(startDate),
    dueDate: dayjs(dueDate),
    logo,
    logoImage:
      logo && `data:image/png;base64,${logo.startsWith('data:') ? logo.split(',')[1] : logo}`,
    licenseInformation,
    createdAt: dayjs(createdAt),
  }
}
export const projectUserFromApi = ({ id, name, projectRole }: ProjectUserFromApi): ProjectUser => {
  return {
    id,
    name,
    projectRole,
  }
}

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const {
    client,
    projectName,
    industries = [],
    createdAtFrom,
    createdAtTo,
    startDateFrom,
    startDateTo,
    dueDateFrom,
    dueDateTo,
  } = data

  return {
    client,
    name: projectName,
    industries: industries.join(','),
    createdAtFrom: createdAtFrom ? createdAtFrom.toISOString() : undefined,
    createdAtTo: createdAtTo ? createdAtTo.toISOString() : undefined,
    startDateFrom: startDateFrom ? startDateFrom.toISOString() : undefined,
    startDateTo: startDateTo ? startDateTo.toISOString() : undefined,
    dueDateFrom: dueDateFrom ? dueDateFrom.toISOString() : undefined,
    dueDateTo: dueDateTo ? dueDateTo.toISOString() : undefined,
  }
}

const removeHeader = (encodedImage: string): string => {
  // const pattern = /data:image\/(png|jpg|gif);base64,/
  const imageWithoutHeader = encodedImage.split(',')[1]
  return imageWithoutHeader
}

export const projectToAPI = (data: any = {}): ProjectToApi => {
  const { name, industry, client, startDateFrom, startDateTo, logo, clientId, licenseInformation } =
    data

  return {
    client: { id: clientId, industry, name: client, licenseInformation },
    name,
    startDate: startDateFrom.toISOString(),
    dueDate: startDateTo.toISOString(),
    logo: removeHeader(logo || ''),
  }
}

export const projectConfigurationsFromApi = (
  data?: ProjectConfigurationsFromApi
): ProjectConfigurations => {
  const { host, port, protocol, username, senderName, senderEmailAddress } = data ?? {}

  return { host, port, protocol, username, senderName, senderEmailAddress, password: '' }
}

export const projectConfigurationsToApi = (data: any): ProjectConfigurationsToApi => {
  const { host, port, protocol, username, senderName, senderEmailAddress, password } = data

  return { host, port, protocol, username, senderName, senderEmailAddress, password }
}

export const projectToInitialValues = (data: any = {}): ProjectFormValues => {
  const { id, name, client, logo, startDate, dueDate } = data

  return {
    id,
    clientId: client.id,
    client: client.name,
    industry: client.industry.id,
    licenseInformation: client.licenseInformation,
    name,
    startDateFrom: new Date(startDate),
    startDateTo: new Date(dueDate),
    logo,
  }
}
