export interface FutureProcessesFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  initialValues?: {
    status: number | undefined
  }
}
