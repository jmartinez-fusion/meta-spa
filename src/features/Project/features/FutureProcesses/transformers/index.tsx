import {
  type FutureProcessDetail,
  type FiltersToApi,
  type FutureProcess,
} from 'Project/features/FutureProcesses/types'

export const filtersToApi = (data: any = {}): FiltersToApi => {
  const { processBranch, status } = data

  return {
    processBranch,
    status,
  }
}

export const futureProcessFromApi = (data: any = {}): FutureProcess => {
  const { branchCode, code, futureProcessName, hasChildren, id, spcName, status } = data

  return {
    branchCode,
    code,
    futureProcessName,
    hasChildren,
    id,
    spcName,
    status,
  }
}

export const futureProcessDetailFromApi = (data: any = {}): FutureProcessDetail => {
  const { futureProcessName, parentProcessName, processId, spc, status, subProcess } = data

  return {
    futureProcessName,
    parentProcessName,
    processId,
    spc,
    status,
    subProcess,
  }
}
