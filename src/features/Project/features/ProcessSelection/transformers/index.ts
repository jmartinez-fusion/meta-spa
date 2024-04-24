import {
  type FutureProcess,
  type FutureProcessFromApi,
  type FutureProcessToApi,
  type SPC,
  type SPCFromApi,
} from 'Project/features/ProcessSelection/types'

export const futureProcessFromApi = ({
  id,
  futureProcessName,
  code,
  branchCode,
  isSelected,
  canBeDeleted,
  subProcesses = [],
}: FutureProcessFromApi): FutureProcess => {
  return {
    id,
    name: futureProcessName,
    code,
    isSelected,
    canBeDeleted,
    branchCode,
    subProcesses: subProcesses.map((subProcess: FutureProcessFromApi) =>
      futureProcessFromApi(subProcess)
    ),
  }
}

export const spcFromApi = ({
  id = '',
  name = '',
  code = '',
  visibleCode = '',
}: SPCFromApi): SPC => {
  return {
    id,
    value: id,
    name,
    code,
    branchCode: visibleCode,
  }
}

export const futureProcessToApi = ({
  name,
  branchCodeSelected,
  code,
  associatedSPC,
  parentFutureProcess,
}: any): FutureProcessToApi => {
  return {
    name,
    visibleCode: branchCodeSelected + code,
    code,
    type: associatedSPC ? 'spc' : 'futureProcess',
    parent: associatedSPC || parentFutureProcess,
  }
}
