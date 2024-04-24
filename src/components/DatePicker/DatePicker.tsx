import React from 'react'
import { DatePicker as MUIDatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { type TextFieldProps } from '@mui/material'
import { DateRange } from '@mui/icons-material'

interface CustomProps {
  error?: boolean
  helperText?: string
  onBlur?: () => void
  slotProps?: any
}

const DatePicker: React.FC<DatePickerProps<any> & CustomProps & TextFieldProps> = ({
  error = false,
  helperText = '',
  onBlur = () => {},
  slotProps = {},
  ...restProps
}) => {
  const { textField: textFieldSlotProps, ...restSlotProps } = slotProps

  return (
    <MUIDatePicker
      slots={{ openPickerIcon: DateRange }}
      slotProps={{
        inputAdornment: {
          position: 'start',
        },
        textField: {
          name: restProps.name,
          error,
          helperText,
          onBlur,
          ...textFieldSlotProps,
        },
        ...restSlotProps,
      }}
      {...restProps}
    />
  )
}

export default DatePicker
