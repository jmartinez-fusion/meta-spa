import { type TextFieldProps } from '@mui/material'

export interface RichTextEditorProps extends TextFieldProps {
  label?: string
  placeholder?: string
  onChange: (value: any) => void
  value?: any
  disabled?: boolean
  error?: boolean
  helperText?: string
}
