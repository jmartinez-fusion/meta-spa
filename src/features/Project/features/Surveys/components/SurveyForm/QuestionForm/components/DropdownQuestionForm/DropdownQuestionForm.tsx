import { type FC, type ChangeEvent, useState } from 'react'
import { FormHelperText, IconButton, SvgIcon, TextField } from '@mui/material'
import { DeleteForeverOutlined } from '@mui/icons-material'
import { type QuestionFormProps } from 'Project/features/Surveys/components/SurveyForm/QuestionForm/types'
import styles from './dropdownQuestion.module.scss'

type OptionType = { value: string; label: string } | string

const DropdownQuestionForm: FC<QuestionFormProps> = ({
  getFieldProps,
  setFieldValue,
  initialValues = [],
}) => {
  const [autoFocus, setAutoFocus] = useState(false)
  const optionsValue = getFieldProps(`options`).value ?? initialValues
  const error = getFieldProps(`options`).helperText

  const handleChangeOption = (index: number, e: ChangeEvent<any>): void => {
    const newOptions = [...optionsValue]
    newOptions[index] = e.target.value
    setFieldValue('options', newOptions)
  }
  const deleteOption = (index: number): void => {
    const newOptions = [...optionsValue]
    newOptions.splice(index, 1)
    setFieldValue('options', newOptions)
  }

  const addOption = (): void => {
    const newOptions = [...optionsValue, '']
    setFieldValue('options', newOptions)
  }

  return (
    <div className={styles.container}>
      {optionsValue.map((option: OptionType, index: number) => (
        <TextField
          variant="standard"
          autoFocus={autoFocus && index === optionsValue.length - 1}
          InputProps={{
            startAdornment: <div className={styles.optionNumber}>{index + 1}.</div>,
            endAdornment: (
              <IconButton
                onClick={() => {
                  deleteOption(index)
                }}
              >
                <SvgIcon fontSize="small">
                  <DeleteForeverOutlined />
                </SvgIcon>
              </IconButton>
            ),
          }}
          key={`option_${index}`}
          value={option}
          onChange={(e: ChangeEvent<any>) => {
            handleChangeOption(index, e)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              addOption()
              setAutoFocus(true)
            }
          }}
        />
      ))}
      <TextField
        variant="standard"
        placeholder="Add Option"
        onFocus={() => {
          setAutoFocus(true)
        }}
        onBlur={() => {
          setAutoFocus(false)
        }}
        onChange={(e) => {
          e.stopPropagation()
          e.preventDefault()
          addOption()
        }}
        onClick={addOption}
        value=""
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  )
}

export default DropdownQuestionForm
