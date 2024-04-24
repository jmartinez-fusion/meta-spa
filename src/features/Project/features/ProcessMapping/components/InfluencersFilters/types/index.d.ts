export interface InfluencersFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialFilters?: {
    name?: string
    departments?: string
    positions?: string
    // // role?: string
    influences?: string
    excluded?: boolean | null
  }
}
