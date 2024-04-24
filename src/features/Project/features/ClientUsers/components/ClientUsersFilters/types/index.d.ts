export interface ClientUserFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: {
    name: string
    email: string
  }
}
