import { type ReactNode } from 'react'

export interface QuestionActionProps {
  title?: string
  onClick?: () => void
  active?: boolean
  children?: ReactNode
}
