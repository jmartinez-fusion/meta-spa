import { type FutureProcessDetail } from 'Project/features/FutureProcesses/types'
import type React from 'react'

export interface EditFutureProcessPresentationProps {
  futureProcess?: FutureProcessDetail
  handleCloseModalEdit: () => void
  goToEditPresentation: () => void
  handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleStart: (event: React.MouseEvent<HTMLButtonElement>) => void
}
