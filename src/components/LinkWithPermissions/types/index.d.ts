import { type PermissionsProps } from 'components/Gated/types'
import { type ReactNode } from 'react'

export interface LinkWithPermissionsProps {
  permissions?: PermissionsProps
  to: string
  children: ReactNode
}
