import { type ReactNode } from 'react'

export interface GatedProps {
  children: ReactNode
  orValidation?: boolean
  permissions?: PermissionsProps
  forbiddenElement?: string | ReactNode | null
}

export type PermissionsProps = string | string[]
