export interface ProcessMappingFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialFilters?: {
    processBranch?: string
    mappedTo?: string
    mappedStatus?: string
  }
}
