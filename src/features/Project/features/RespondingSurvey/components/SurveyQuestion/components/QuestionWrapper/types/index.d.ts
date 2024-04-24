import { type ReactNode } from 'react'
import { type AllowedQuestion } from 'Project/features/RespondingSurvey/types'

export interface QuestionWrapperProps {
  children: ReactNode
  module: 'future_state_process' | 'current_state_process'
  question: AllowedQuestion
  onNext?: (data: any) => void
  onPrevious?: () => void
  loadingNext?: boolean
}
