export interface FutureProcessFormProps {
  onSubmit: (data: any) => void
  initialValues?: {
    name?: string
    parentFutureProcess?: string
    associatedSPC?: string
    code: string
  }
  mode?: 'create' | 'edit' | 'view'
  isLoading?: boolean
  isSubmitting?: boolean
}
