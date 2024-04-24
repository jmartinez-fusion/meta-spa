export interface DepartmentsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialFilters?: {
    name: string
    parentName: string
  }
}
