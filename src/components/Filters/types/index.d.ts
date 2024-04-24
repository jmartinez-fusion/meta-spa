import { type ReactNode } from 'react'

export interface FilterProps {
  onCancel?: () => void
  onApply: (data: any) => void
  onClear: () => void
  topFilters?: ReactNode
  bottomFilters?: ReactNode
  isSearching?: boolean
}
