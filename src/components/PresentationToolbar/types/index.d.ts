import { type ReactNode } from 'react'

export interface PresentationToolbarProps {
  children?: ReactNode
  onDiscardChanges: () => void
  onSave: () => void
  onAddCaptures: (files: File[] = []) => void
  onAddDescription: () => void
  isSaving: boolean
  isDragActive?: boolean
}
