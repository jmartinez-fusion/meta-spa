export interface SurveysFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: {
    title: string
    status: string[]
    deliveredAtFrom: any
    deliveredAtTo: any
    closedAtFrom: any
    closedAtTo: any
  }
}
