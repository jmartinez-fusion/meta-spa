import { type Dayjs } from 'dayjs'
import { type FutureProcess } from 'Project/features/FutureProcess/types'

export interface DepartmentCode {
  id: string
  name: string
}

export interface ProcessMapping {
  id: string
  futureProcessName: string
  code: string
  branchCode: string
  department?: DepartmentCode
  mappedStatus?: string | null
  hasChildren?: boolean
}

export interface SubDepartment {
  children: []
  code: string
  createdAt: Dayjs
  id: string
  manager: { id: string; name: string } | null
  name: string
  parent: DepartmentProcessMapping | null
  updatedAt: Dayjs
}

export interface DepartmentProcessMapping {
  id: string
  name: string
  visibleCode: string
  parent?: DepartmentProcessMapping | null
  updatedAt?: Dayjs
  code?: string
  subDepartments?: SubDepartment[] | null
  createdAt?: Dayjs
  manager?: { id: string; name: string } | null
}

export interface ProcessMappingDetail {
  id: string
  futureProcessName: string
  visibleCode: string
  spc: string
  parentProcessName: string | null
  subProcess: FutureProcess[]
  presentation: {
    status: string
    date: Dayjs
  }
  department: DepartmentProcessMapping
  mappedStatus?: string | null
}

export interface FiltersToApi {
  processBranch: string
  mappedTo: string
  mappedStatus: string
}

export interface FiltersInfluencersToApi {
  name: string
  departments: []
  positions?: []
  influences?: []
  excluded: boolean
}

export interface Influencer {
  id: string
  influencerId: string
  code: string
  email?: string
  name: string
  departments: []
  projectRole: string
  positions?: []
  influences?: []
  excluded: boolean
}

// export interface InfluencersFormValues {
//   processId?: string
//   excluded?: boolean | null
//   influences?: object
// }

export interface InfluencersFormValues {
  processId?: string
  excluded?: boolean | null
  influences?: object | Record<string, boolean>
}

// export interface Influences {
//   sme: boolean
//   pkl: boolean
//   skl: boolean
//   mapper: boolean
//   influencer: boolean
// }

interface Influences {
  sme: boolean
  pkl: boolean
  skl: boolean
  mapper: boolean
  influencer: boolean
  [key: string]: boolean
}

export interface StakeholderInfluencerFromApi {
  id: string
  code: string
  name: string
  email: string
  positions: string[]
  isUser: boolean
  projectRole: string | null
}

export interface InfluencerDetail {
  id: string
  stakeholder: StakeholderInfluencerFromApi
  influences?: Influences | undefined
  excluded: boolean
}
