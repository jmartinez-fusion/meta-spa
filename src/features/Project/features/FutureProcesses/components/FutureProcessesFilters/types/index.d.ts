export interface FutureProcessesFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialFilters?: {
    processBranch?: string
    status?: string
  }
}
