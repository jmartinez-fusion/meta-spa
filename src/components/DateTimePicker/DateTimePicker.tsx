import React from 'react'
import { type TextFieldProps } from '@mui/material'
import { DateRange } from '@mui/icons-material'
import { DateTimePicker as MuiDateTimePicker, type DateTimePickerProps } from '@mui/x-date-pickers'

interface CustomProps {
  error?: boolean
  helperText?: string
  onBlur?: () => void
  slotProps?: any
}

const DateTimePicker: React.FC<DateTimePickerProps<any> & CustomProps & TextFieldProps> = ({
  error = false,
  helperText = '',
  onBlur = () => {},
  slotProps = {},
  ...restProps
}) => {
  const { textField: textFieldSlotProps, ...restSlotProps } = slotProps

  return (
    <MuiDateTimePicker
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
      format="MM/dd/yyyy HH:mm"
      {...restProps}
    />
  )
}

export default DateTimePicker
