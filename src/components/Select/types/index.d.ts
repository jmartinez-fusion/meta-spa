import { type TextFieldProps } from '@mui/material'

export interface Option {
  name: any
  value: any
}

export interface EmptyValue {
  value: number | string | object
  name: string
}

export interface SelectProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: any
  onChange: (value: any) => void // Reemplaza 'any' con el tipo de datos específico esperado
  options: Option[]
  label?: string
  multiple?: boolean
  emptyValue?: EmptyValue | null
  onClear?: () => any
}
