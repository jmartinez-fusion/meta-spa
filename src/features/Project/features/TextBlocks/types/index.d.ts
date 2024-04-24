import { type Dayjs } from 'dayjs'
import { type Category } from 'features/Categories/types'
import { type RichText } from 'Project/features/PresentationTool/types'

export type TextBlockReferenceType = 'survey_answer' | 'presentation_step'

export interface TextBlockFromApi {
  id: string
  title: string
  description?: string | RichText
  createdBy?: string | null
  // createdAt?: Dayjs | string | null | undefined
  createdAt?: string | null | Dayjs
  updatedBy?: string | null
  updatedAt?: string | null | Dayjs
  isGlobal: boolean
  tags?: Tag[]
  references: TextBlockReference[]
  category?: string | Category
}

export interface TextBlockFilterToApi {
  question?: string
  tags?: string | string[]
  categories?: string
  createdBy?: string | null
  createdAtFrom?: Dayjs | string | null
  createdAtTo?: Dayjs | string | null
  updatedBy?: string | null
  updatedAtFrom?: Dayjs | string | null
  updatedAtTo?: Dayjs | string | null
}

export interface SurveyTextBlockReference {
  surveyName?: string
  surveyResponse?: string
  surveyId?: string
  answerId?: string
  responderName?: string
  questionAnswerId?: string
  questionId?: string
  questionName?: string
  module?: 'future_state_process' | 'current_state_process'
}

export interface PresentationTextBlockReference {
  processId?: string
  processName?: string
  stepNumber?: string
  stepTitle?: string
  module?: 'future_state_process' | 'current_state_process'
}

export interface TextBlockReference {
  id: string
  type: TextBlockReferenceType
  name?: string
  metadata: any
  referenceData?: SurveyTextBlockReference & PresentationTextBlockReference
}

export interface TextBlockReferenceFromApi {
  id: string
  type: TextBlockReferenceType
  metadata: any
  survey?: {
    id?: string
    module?: 'future_state_process' | 'current_state_process'
    name: any
  }
  stepNumber?: string
  question?: {
    id?: string
    name: any
  }
  name?: string
  module?: 'future_state_process' | 'current_state_process'
  processId?: string
  answer?: {
    responderName?: string
    answerId?: string
    questionAnswerId?: string
  }
}

export interface TextBlockReferenceToApi {
  referenceId: string
  type: TextBlockReferenceType
  metadata: any
}

export interface TextBlocksLinkingProps {
  reference: TextBlockReference
  onSuccess: () => void
}

export interface TextBlockToApi {
  title?: string
  tags?: string | Tag[]
  category?: string
  description?: string
  references: TextBlockReferenceToApi[]
}

export interface Tag {
  id: string
  name: string
  createdAt?: Dayjs
  updatedAt?: Dayjs
}

export interface TagFromApi {
  id: string
  name: string
  createdAt?: Dayjs
  updatedAt?: Dayjs
}
