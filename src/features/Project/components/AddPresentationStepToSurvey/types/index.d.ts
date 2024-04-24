import { type AllowedPresentationStep } from 'Project/features/PresentationTool/types'

export interface AddPresentationStepToSurveyProps {
  step: AllowedPresentationStep
  module?: 'future_state_process' | 'current_state_process'
  effectiveProcessId: string | undefined
}
