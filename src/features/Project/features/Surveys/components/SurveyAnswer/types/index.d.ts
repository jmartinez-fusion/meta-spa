import { type AllowedQuestion } from 'Project/features/RespondingSurvey/types'
import type DropdownQuestion from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/DropdownQuestion'
import type ParagraphQuestion from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/ParagraphQuestion'

export interface SurveyAnswerProps {
  question: AllowedQuestion
  module: 'future_state_process' | 'current_state_process'
  onLinkWithTextBlock?: () => void
  selected?: boolean
}

export interface SurveyDropdownAnswerProps extends SurveyAnswerProps {
  question: DropdownQuestion
}

export interface SurveyParagraphAnswerProps extends SurveyAnswerProps {
  question: ParagraphQuestion
}
