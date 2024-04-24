import { useState, type FC } from 'react'
import { IconButton, SvgIcon, TextField, type TextFieldProps } from '@mui/material'
import { RemoveRedEyeRounded, VisibilityOffRounded } from '@mui/icons-material'

type PasswordTextFieldProps = TextFieldProps

const PasswordTextField: FC<PasswordTextFieldProps> = (textFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <IconButton
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          >
            <SvgIcon fontSize="small">
              {showPassword ? <VisibilityOffRounded /> : <RemoveRedEyeRounded />}
            </SvgIcon>
          </IconButton>
        ),
      }}
      {...textFieldProps}
    />
  )
}

export default PasswordTextField
