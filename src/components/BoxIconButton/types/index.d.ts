import { type ElementType } from 'react'

export interface BoxIconButtonProps {
  label?: string
  Icon: ElementType
  onClick?: () => void
  active?: boolean
}
