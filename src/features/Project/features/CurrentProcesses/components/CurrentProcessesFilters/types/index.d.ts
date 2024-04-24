export interface CurrentProcessesFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialFilters?: {
    currentProcess?: string | null
    associatedCurrentProcess?: string | null
    associatedSPCProcess?: string | null
    spcBranch?: string | null
    onlyUncategorized?: boolean | string
    updatedAtFrom?: string | null
    updatedAtTo?: string | null
    status?: string
  }
}
