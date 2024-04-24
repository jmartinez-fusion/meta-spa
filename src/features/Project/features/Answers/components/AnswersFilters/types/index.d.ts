export interface AnswersFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: {
    stakeholder: string
    departments: string[]
    positions: string[]
    projectRole: string[]
    influencers: string[]
  }
}
