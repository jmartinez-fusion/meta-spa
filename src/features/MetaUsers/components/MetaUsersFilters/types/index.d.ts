export interface MetaUserFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: {
    name: string
    email: string
    roles: string
    active: boolean
  }
}
