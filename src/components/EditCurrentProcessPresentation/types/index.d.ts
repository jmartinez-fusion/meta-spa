import type React from 'react'
import { type CurrentProcess } from 'Project/features/CurrentProcesses/types'

export interface EditCurrentProcessPresentationProps {
  currentProcess?: CurrentProcess
  handleCloseModalEdit: () => void
  goToEditPresentation: () => void
  handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleStart: (event: React.MouseEvent<HTMLButtonElement>) => void
}
