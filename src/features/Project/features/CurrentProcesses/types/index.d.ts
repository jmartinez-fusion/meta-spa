import { type Dayjs } from 'dayjs'

export interface AssociatedCurrentProcess {
  id?: string
  name?: string
  value?: string
}

export interface AssociatedSPC {
  id?: string
  name?: string
  value?: string
  branchCode?: string
}

export interface CurrentProcess {
  id: string
  currentProcess?: string
  associatedCurrentProcesses?: AssociatedCurrentProcess
  associatedSpc?: AssociatedSPC
  spcBranch?: string[]
  mappedBy: string | null
  updatedAt?: string | null | Dayjs
  canBeDeleted?: boolean
  status?: string
}

export interface CurrentProcessRequestCapturing {
  id: string
  name: string
  subProcesses?: CurrentProcessRequestCapturing[]
  presentationId: string
}

export interface CurrentProcessRequestCapturingFromApi {
  id: string
  name: string
  subProcesses: CurrentProcessRequestCapturingFromApi[]
  presentationId: string
}

export interface CurrentProcessesStatus {
  id: string
  name: string
}

export interface FiltersToApi {
  currentProcess?: string
  associatedCurrentProcess?: string
  associatedSPCProcess?: string
  spcBranchOnlyUncategorized?: boolean | string
  spcBranch?: string
  updatedAtFrom?: string
  updatedAtTo?: string
  status?: string
}

export interface CurrentProcessFormValues {
  id?: string
  name?: string
  associatedCurrentProcesses?: AssociatedCurrentProcess | null
  associatedSPCs?: AssociatedSPC | null
}

export interface CurrentProcessToApi {
  name?: string
  associatesId?: string | null
  spcsId?: string | null
  submitAndRedirect: boolean
}
