export interface FutureProcess {
  branchCode?: string
  code: string
  futureProcessName: string
  hasChildren?: boolean
  id: string
  spcName: string
  status?: string
}

export interface FutureProcessDetail {
  id?: string
  futureProcessName?: string
  parentProcessName?: string | null
  processId?: string
  hasChildren?: boolean
  spc?: string
  status: string | undefined | null
  subProcess?: [
    {
      futureProcessName?: string
    },
  ]
}

export interface FutureProcessesStatus {
  id: string
  name: string
}

export interface FiltersToApi {
  processBranch?: string
  status?: string
}
