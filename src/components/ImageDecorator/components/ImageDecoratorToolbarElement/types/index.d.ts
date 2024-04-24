import { type ReactNode } from 'react'

export interface ImageDecoratorToolbarElementProps {
  title?: string
  onClick: () => void
  active?: boolean
  children?: ReactNode
}
