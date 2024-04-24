import { type AllowedQuestion } from 'Project/features/RespondingSurvey/types'
import type DropdownQuestion from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/DropdownQuestion'
import type ParagraphQuestion from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/ParagraphQuestion'

export interface SurveyQuestionProps {
  question: AllowedQuestion
  module: 'future_state_process' | 'current_state_process'
  onNext?: (data?: any) => void
  onPrevious?: () => void
}

export interface SurveyDropdownQuestionProps extends SurveyQuestionProps {
  question: DropdownQuestion
}

export interface SurveyParagraphQuestionProps extends SurveyQuestionProps {
  question: ParagraphQuestion
}
