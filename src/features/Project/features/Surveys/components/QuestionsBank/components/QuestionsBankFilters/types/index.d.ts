export interface QuestionsBankFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: {
    question: string
    categories: string[]
    industries: string[]
  }
}
