import { type TextFieldProps } from '@mui/material'
import { type ReactNode } from 'react'

export interface CheckboxOption {
  id?: string
  label: string | ReactNode
  subOptions?: CheckboxOption[]
}

export interface CheckBoxOptionProps {
  option: CheckboxOption
  selectedOptionIds: string[]
  disabled?: boolean
  handleChange: (optionId: string) => void
}
export interface CheckBoxListProps {
  options: CheckboxOption[]
  fullOptions?: CheckboxOption[]
  selectedOptionIds: string[]
  loading?: boolean
  recursivelySelection?: boolean
  disabled?: boolean
  showDefaultSearch?: boolean
  searchProps?: TextFieldProps
  onChange: (options: string[]) => void
}
