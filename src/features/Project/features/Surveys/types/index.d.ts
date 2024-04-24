import { type Dayjs } from 'dayjs'
import {
  type AllowedQuestion,
  type AllowedQuestionTypeFromJson,
  type SurveyStatus,
  type SurveyStatusValue,
} from 'Project/features/RespondingSurvey/types'
import { type SurveyQuestionType } from 'Project/features/RespondingSurvey/models/SurveyQuestion.ts'

export interface SurveyType {
  type: SurveyTypeValue
  isContext: boolean
  isCapture: boolean
}

export type SurveyTypeValue = 'context' | 'capture'

export interface SurveyQuestion {
  uuid: string
  id?: string
  title?: string
  description?: string
  type: SurveyQuestionType
  process?: string
  startStep?: string
  endStep?: string
  [x: string]: any
}

export interface SurveyAnswer {
  id: string
  title: string
  module: 'future_state_process' | 'current_state_process'
  status: SurveyStatus
  stakeholder: SurveyStakeholder
  lastAnsweredAt?: Dayjs
  questions: AllowedQuestion[]
}

export interface SurveyStakeholder {
  id?: string
  name?: string
  projectRole?: string
  positions?: string[]
  departments?: Array<{ id: string; name: string }>
  influencerTypes?: string[]
}

export interface SurveyStakeholderFromApi {
  id?: string
  name?: string
  projectRole?: string
  positions?: string[]
  departments?: Array<{ id: string; name: string }>
  influencerType?: string[]
}

export interface SurveyAnswerFromApi {
  id: string
  title: string
  module: 'future_state_process' | 'current_state_process'
  status: SurveyStatusValue
  stakeholder: SurveyStakeholderFromApi
  questions: AllowedQuestionTypeFromJson[]
}

export interface SurveyDropdownQuestion extends SurveyQuestion {
  options: string[]
}

export interface SurveyParagraphQuestion extends SurveyQuestion {}

export type AllowedSurveyQuestion = SurveyDropdownQuestion | SurveyParagraphQuestion

export interface SurveyProcess {
  id: string
  name: string
  steps: Array<{
    id: string
    name: string
  }>
}

export interface SurveyProcessFromApi {
  id: string
  name: string
  templateBlocks: Array<{
    id: string
    name: string
  }>
}

export interface FiltersToApi {
  title: string
  statuses: string
  deliveredAtFrom: string
  deliveredAtTo: string
  closedAtFrom: string
  closedAtTo: string
}

export interface Survey {
  id: string
  title: string
  type: SurveyType
  status: SurveyStatus
  totalSent: number
  totalSurveyed: number
  deliveredAt?: Dayjs
  closedAt?: Dayjs
}

export interface SurveyDetail {
  id: string
  title?: string
  description?: string
  status: SurveyStatus
  type: SurveyType
  totalSent: number
  totalSurveyed: number
  deliveredAt?: Dayjs
  closedAt?: Dayjs
  createdAt: Dayjs
  updatedAt: Dayjs
  statusUpdatedAt: Dayjs
  questions: AllowedSurveyQuestion[]
  departments?: any[]
  includeChildren?: boolean
  includingExcluded?: boolean
  segmentation?: string
  sprintId?: string
}

export interface SurveyFromApi {
  id: string
  title: string
  type: SurveyTypeValue
  status: SurveyStatusValue
  responses: {
    answered: number
    total: number
  }
  deliveredAt?: string
  closedAt?: string
}

export interface SurveyDetailFromApi {
  id: string
  title?: string
  description?: string
  status: SurveyStatusValue
  type: SurveyTypeValue
  responses: {
    answered: number
    total: number
  }
  segmentation?: {
    departments?: any[]
    allDepartmentStakeholders?: boolean
    allInfluencerStakeholders?: boolean
    associatedInfluencers?: boolean
    includeChildren?: boolean
    includingExcluded?: boolean
  }
  deliveredAt?: string
  closedAt?: string
  createdAt: string
  statusUpdatedAt: string
  updatedAt: string
  questions: any[]
}
