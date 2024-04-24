import { type ReactNode } from 'react'

export interface PrivateScreenTitleProps {
  goBackPath?: string
  title: string
  rightContent?: ReactNode
  onGoBack?: () => void
}
