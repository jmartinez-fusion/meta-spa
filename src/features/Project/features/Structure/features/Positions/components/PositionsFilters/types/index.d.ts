export interface PositionsFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialFilters?: {
    name: string
    code: string
    updatedAtFrom: any
    updatedAtTo: any
  }
}
