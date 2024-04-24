export interface CurrentProcessesFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialValues?: {
    status: number | undefined
  }
}
