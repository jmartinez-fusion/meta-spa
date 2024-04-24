import { type ReactNode } from 'react'

export interface AddStepsActionsProps {
  onAddCaptures: (files: File[] = []) => void
  onAddDescription: () => void
  children?: ReactNode
}
