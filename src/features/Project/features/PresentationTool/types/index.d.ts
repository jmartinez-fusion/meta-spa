import { type ReactNode } from 'react'
import type PresentationImageStep, {
  PresentationImageStepFromJson,
} from 'Project/features/PresentationTool/types/PresentationImageStep.ts'
import type PresentationTextStep, {
  PresentationTextStepFromJson,
} from 'Project/features/PresentationTool/types/PresentationTextStep.ts'

export interface Image {
  id: string
  url: string
}
export type RichText = any

export type AllowedPresentationStep = PresentationImageStep | PresentationTextStep

export type AllowedPresentationStepFromJson =
  | PresentationImageStepFromJson
  | PresentationTextStepFromJson

export type PresentationType = 'image' | 'text'

export interface PresentationToolProps {
  processId: string
  initialData?: AllowedPresentationStep[]
  mode?: 'edit' | 'view'
  isSaving?: boolean
  module: 'future_state_process' | 'current_state_process'
  onSave: (steps: AllowedPresentationStep[]) => void
  effectiveProcessId?: string
}

export interface PresentationStepProps {
  number?: number
  step: AllowedPresentationStep
  downStep?: () => void
  upStep?: () => void
  dragProps?: any
  readOnly?: boolean
  onDeleteStep?: () => void
  canLinkWithTextBlocks?: boolean
  onLinkWithTextBlock?: (metadata?: any) => void
  canAddStepsToSurveys?: boolean
  module?: 'future_state_process' | 'current_state_process'
  effectiveProcessId?: string
  selected?: boolean
}

export interface PresentationStepBoxProps {
  step: AllowedPresentationStep
  number?: number
  children?: ReactNode
  downStep?: () => void
  upStep?: () => void
  readOnly?: boolean
  dragProps?: any
  onDeleteStep?: () => void
  canLinkWithTextBlocks?: boolean
  onLinkWithTextBlock?: (metadata?: any) => void
  canAddStepsToSurveys?: boolean
  module?: 'future_state_process' | 'current_state_process'
  effectiveProcessId?: string
  selected?: boolean
}

export interface PresentationImageStepProps {
  step: PresentationImageStep
  number?: number
  downStep?: () => void
  upStep?: () => void
  readOnly?: boolean
  dragProps?: any
  onDeleteStep?: () => void
  canLinkWithTextBlocks?: boolean
  onLinkWithTextBlock?: (metadata?: any) => void
  canAddStepsToSurveys?: boolean
  module?: 'future_state_process' | 'current_state_process'
  effectiveProcessId?: string
  selected?: boolean
}

export interface PresentationTextStepProps {
  step: PresentationTextStep
  number?: number
  downStep?: () => void
  upStep?: () => void
  dragProps?: any
  readOnly?: boolean
  onDeleteStep?: () => void
  canLinkWithTextBlocks?: boolean
  onLinkWithTextBlock?: (metadata?: any) => void
  canAddStepsToSurveys?: boolean
  module?: 'future_state_process' | 'current_state_process'
  effectiveProcessId?: string
  selected?: boolean
}
