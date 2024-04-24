import { type TextBlockFromApi } from 'Project/features/TextBlocks/types'

export interface TextBlocksFormProps {
  onSubmit: (data: any) => void
  mode?: 'create' | 'edit' | 'view'
  initialValues?: TextBlockFromApi
  isSubmitting?: boolean
  onCancel?: () => void
}
