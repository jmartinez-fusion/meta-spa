export interface SprintsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: {
    sprint: string
    endDate: string
    startDate: string
  }
}
