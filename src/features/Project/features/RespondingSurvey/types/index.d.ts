import type SurveyCaptureQuestion, {
  SurveyCaptureQuestionFromJson,
} from 'Project/features/RespondingSurvey/models/SurveyCaptureQuestion'
import type SurveyDropdownQuestion, {
  SurveyDropdownQuestionFromJson,
} from 'Project/features/RespondingSurvey/models/SurveyDropdownQuestion'
import type SurveyParagraphQuestion, {
  SurveyParagraphQuestionFromJson,
} from 'Project/features/RespondingSurvey/models/SurveyParagraphQuestion'
import { type Dayjs } from 'dayjs'
import {
  type AllowedPresentationStep,
  type AllowedPresentationStepFromJson,
} from 'Project/features/PresentationTool/types'

export type SurveyStatusValue = 'closed' | 'open' | 'pending' | 'paused'

export type AllowedQuestion =
  | SurveyCaptureQuestion
  | SurveyDropdownQuestion
  | SurveyParagraphQuestion

export type AllowedQuestionTypeFromJson =
  | SurveyCaptureQuestionFromJson
  | SurveyDropdownQuestionFromJson
  | SurveyParagraphQuestionFromJson

export interface SurveyStatus {
  status: SurveyStatusValue
  isClosed: boolean
  isOpen: boolean
  isPending: boolean
  isPaused: boolean
}

export interface QuestionProcess {
  id?: string
  name?: string
  steps?: AllowedPresentationStep[]
}

export interface QuestionProcessFromJson {
  id?: string
  name?: string
  templateBlocks?: Array<{ templateBlock: AllowedPresentationStepFromJson }>
}

export interface RespondingSurvey {
  id: string
  title: string
  currentQuestion: AllowedQuestion
  module: 'future_state_process' | 'current_state_process'
  nextQuestion: AllowedQuestion | null
  previousQuestion: AllowedQuestion | null
  status: SurveyStatus
  questions: AllowedQuestion[]
  progress: number
}

export interface RespondingSurveyFromApi {
  id: string
  title: string
  module: 'future_state_process' | 'current_state_process'
  lastSavedQuestionId: string | null
  status: SurveyStatusValue
  questions: AllowedQuestionTypeFromJson[]
}

export interface Answer {
  id?: string
  answeredAt?: Dayjs
  response?: any
}

export interface AnswerFromApi {
  id?: string
  respondedAt?: string
  response: {
    response?: any
  }
}
