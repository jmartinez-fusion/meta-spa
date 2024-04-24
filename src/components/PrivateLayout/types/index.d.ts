import { type ElementType, type ReactNode } from 'react'
import { type PermissionsProps } from 'components/Gated/types'

export type SidebarComponents = NavSection[]
export interface NavItem {
  to: string
  icon: ElementType
  permissions?: PermissionsProps
  orValidation?: boolean
  label: string
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export interface SidebarProps {
  handleClickMenu?: () => void
  collapsed?: boolean
  sidebarComponents?: SidebarComponents
  handleClickCollapse?: () => void
}

export interface HeaderProps {
  handleClickMenu: () => void
  i18n?: any
}

export interface PrivateLayoutProps {
  sidebar?: ElementType<SidebarProps>
  sidebarComponents?: SidebarComponents
  header?: ElementType<HeaderProps>
  mainContent?: ElementType
  children?: ReactNode
}
