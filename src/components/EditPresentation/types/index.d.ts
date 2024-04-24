import type React, { ReactNode } from 'react'
import { type PermissionsProps } from 'components/Gated/types'

export interface EditPresentationModalProps {
  children?: ReactNode
  handleCloseModalEdit: () => void
  goToEditPresentation: () => void
  handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleStart: (event: React.MouseEvent<HTMLButtonElement>) => void
  showStart?: boolean
  resetPermissions: PermissionsProps
}
