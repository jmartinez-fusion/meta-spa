import { type AllowedPresentationStep } from 'Project/features/PresentationTool/types'

export interface AddPresentationStepToSurveyModalProps {
  step: AllowedPresentationStep
  onClose: () => void
  module?: 'future_state_process' | 'current_state_process'
  effectiveProcessId: string | undefined
}
