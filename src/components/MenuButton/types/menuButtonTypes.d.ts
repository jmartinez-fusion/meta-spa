import { type ElementType } from 'react'

interface MenuButtonProps {
  icon: ElementType
  label: string
  to: string
  collapsed?: boolean
  permissions?: string[] | string
  orValidation?: boolean
}
