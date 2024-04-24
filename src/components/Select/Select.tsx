import { IconButton, MenuItem, SvgIcon, TextField } from '@mui/material'
import React, { useCallback } from 'react'
import { Close } from '@mui/icons-material'

import { type SelectProps } from 'components/Select/types'

const getValue = (
  value: SelectProps['value'],
  emptyValue: SelectProps['emptyValue'],
  multiple?: boolean
): SelectProps['value'] => {
  if (multiple && emptyValue && (value as any[]).includes(emptyValue.value)) {
    if ((value as any[])[(value as any[]).length - 1] === emptyValue.value) {
      return [emptyValue.value]
    } else {
      return (value as any[]).filter((option) => option !== emptyValue.value)
    }
  }

  return value
}

const Select: React.FC<SelectProps> = ({
  value = '',
  onChange,
  options,
  label,
  multiple = false,
  emptyValue = null,
  onClear = undefined,
  ...restProps
}: SelectProps) => {
  const inputValue = getValue(value, emptyValue, multiple)
  // this allows false values
  const canClear =
    inputValue &&
    (Array.isArray(inputValue)
      ? inputValue.length > 0
      : inputValue !== undefined && inputValue !== null && inputValue !== '') &&
    onClear

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event)
    },
    [onChange]
  )

  return (
    <TextField
      label={label}
      onChange={handleTextFieldChange}
      select
      sx={{
        textTransform: 'capitalize',
      }}
      SelectProps={{
        multiple,
        value: inputValue,
        endAdornment: canClear && !restProps.disabled && (
          <IconButton onClick={onClear}>
            <SvgIcon fontSize="small" sx={{ mr: 1 }}>
              <Close />
            </SvgIcon>
          </IconButton>
        ),
      }}
      {...restProps}
    >
      {options.map(({ name, value: opValue }, index) => (
        <MenuItem
          key={`${name}_${index}`}
          value={opValue}
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {name}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Select
