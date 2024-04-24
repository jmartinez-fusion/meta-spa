export interface RolesFormProps {
  onSubmit: (data: any) => void
  initialValues?: { name?: string; permissions?: string[]; active?: boolean }
  mode?: 'create' | 'edit' | 'view'
  isLoading?: boolean
  isSubmitting?: boolean
}
