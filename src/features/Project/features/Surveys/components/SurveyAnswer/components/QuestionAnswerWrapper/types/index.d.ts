import { type ReactNode } from 'react'
import { type AllowedQuestion } from 'Project/features/RespondingSurvey/types'

export interface QuestionAnswerWrapperProps {
  children: ReactNode
  module: 'future_state_process' | 'current_state_process'
  question: AllowedQuestion
  onLinkWithTextBlock?: () => void
  selected?: boolean
}
