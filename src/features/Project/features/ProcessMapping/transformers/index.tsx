import {
  type ProcessMappingDetail,
  type FiltersToApi,
  type ProcessMapping,
  type Influencer,
  type FiltersInfluencersToApi,
  type InfluencersFormValues,
  type InfluencerDetail,
} from 'Project/features/ProcessMapping/types'

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { processBranch, mappedTo, mappedStatus } = data

  return {
    processBranch,
    mappedTo,
    mappedStatus,
  }
}

export const filtersInfluencersToApi = (data: any = {}): FiltersInfluencersToApi => {
  const { name, departments, positions, influences, excluded } = data

  return {
    name,
    departments,
    positions: positions.map((position: any) => position.value).join(','),
    influences,
    excluded,
  }
}

export const processMappingFromApi = (data: any = {}): ProcessMapping => {
  const { id, futureProcessName, code, branchCode, department, mappedStatus, hasChildren } = data

  return {
    id,
    futureProcessName,
    code,
    branchCode,
    department,
    mappedStatus,
    hasChildren,
  }
}

export const processMappingDetailFromApi = (data: any = {}): ProcessMappingDetail => {
  const {
    id,
    futureProcessName,
    visibleCode,
    spc,
    parentProcessName,
    subProcess,
    presentation,
    department,
    mappedStatus,
  } = data

  return {
    id,
    futureProcessName,
    visibleCode,
    spc,
    parentProcessName,
    subProcess,
    presentation,
    department,
    mappedStatus,
  }
}

export const influencersFromApi = (data: any = {}): Influencer => {
  const {
    id,
    influencerId,
    code,
    name,
    departments,
    projectRole,
    positions,
    influences,
    excluded,
  } = data

  return {
    id,
    influencerId,
    code,
    name,
    departments,
    projectRole,
    positions,
    influences,
    excluded,
  }
}

export const influencerDetailFromApi = (data: any = {}): InfluencerDetail => {
  const { id, stakeholder, excluded, influences } = data

  return {
    id,
    stakeholder,
    excluded,
    influences,
  }
}

export const influencerToApi = (data: any = {}): InfluencersFormValues => {
  const { processId, influences, excluded } = data

  return {
    processId,
    influences,
    excluded: Boolean(excluded),
  }
}
