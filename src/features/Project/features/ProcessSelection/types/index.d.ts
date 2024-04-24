export interface SPC {
  id: string
  name: string
  code: string
  branchCode: string
  value: string
}

export interface SPCFromApi {
  id: string
  name: string
  code: string
  visibleCode: string
}
export interface FutureProcess {
  id: string
  code: string
  name: string
  branchCode?: string
  parent?: {
    id: string
    name: string
  }
  canBeDeleted?: boolean
  isSelected?: boolean
  subProcesses?: FutureProcess[]
}

export interface FutureProcessFromApi {
  id: string
  code: string
  futureProcessName: string
  branchCode?: string
  isSelected?: boolean
  canBeDeleted?: boolean
  parent?: {
    id: string
    name: string
  }
  subProcesses: FutureProcessFromApi[]
}

export interface FutureProcessToApi {
  name: string
  code: string
  type: string
  visibleCode
  parent: string
}
