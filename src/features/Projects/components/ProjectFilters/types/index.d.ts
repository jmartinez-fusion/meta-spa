export interface ProjectsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean,
  initialFilters?: {
    client: string
    projectName: string
    active?: boolean
    industries: string
    startDateFrom: string | null
    startDateTo: string | null
    dueDateFrom: string | null
    dueDateTo: string | null
    createdAtFrom: string | null
    createdAtTo: string | null
  }
}
