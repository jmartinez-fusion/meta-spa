import type React from 'react'

export interface AutocompletePropsCustom {
  name: string
  resourceName: string
  filterName?: string
  extraFilters?: Record<string, any>
  error?: boolean
  label?: string
  helperText?: string | boolean
  filterOption?: (option: any) => boolean
  onBlur?: (e: any) => any
  onInputChange?: (event: React.ChangeEvent<any>, newInputValue: string) => void
  [x: string]: any
}
