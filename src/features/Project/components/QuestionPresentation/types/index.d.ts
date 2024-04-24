import { type AllowedQuestion } from 'Project/features/RespondingSurvey/types'

export interface QuestionPresentationProps {
  module: 'future_state_process' | 'current_state_process'
  question: AllowedQuestion
}
