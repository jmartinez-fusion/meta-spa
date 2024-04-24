export interface StakeholdersFiltersProps {
  onCancel: () => void
  showDepartmentsFilter?: boolean
  onApply: (data: any) => void
  initialFilters?: {
    stakeholder: string
    departments: any[]
    positions: any[]
    updatedAtFrom: any
    updatedAtTo: any
    hasDepartment: string
    isManager: string
    projectRole: string
  }
}
