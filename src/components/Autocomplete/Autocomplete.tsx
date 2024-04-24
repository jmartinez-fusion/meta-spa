import { debounce, Autocomplete as MUIAutocomplete } from '@mui/material'
import TextField from '@mui/material/TextField'
import useGetOptions from 'hooks/useGetOptions'
import { type ReactNode, useState } from 'react'
import { type AutocompletePropsCustom } from './types'
import { generateUniqueId } from 'utils/utils'
import styles from './autocomplete.module.scss'

function Autocomplete({
  name,
  resourceName,
  filterName = 'name',
  extraFilters = {},
  filterOption = () => true,
  error = false,
  helperText = '',
  onBlur = () => {},
  freeSolo = false,
  variant = 'outlined',
  onChange,
  ...restProps
}: AutocompletePropsCustom): ReactNode {
  const [inputValue, setInputValue] = useState<string>('')
  const allOptions = useGetOptions([resourceName], { [filterName]: inputValue, ...extraFilters })
  const options = allOptions?.[`${resourceName}Options`] || []

  const handleAddNewOption = (value: string): void => {
    const newOption = { id: generateUniqueId(), [filterName]: value }
    onChange?.(null, [...options, newOption])
  }

  return (
    <MUIAutocomplete
      options={options
        .map((option) => ({ ...option, key: option.id }))
        .filter((option) => filterOption(option))}
      getOptionLabel={(option) => option.name || option[filterName]}
      getOptionKey={(option) => option.value}
      renderInput={(params) => (
        <TextField
          {...params}
          id={generateUniqueId()}
          name={name}
          label={restProps.label}
          helperText={helperText}
          error={error}
          onBlur={onBlur}
          variant={variant}
          className={styles.inputForm}
        />
      )}
      onInputChange={debounce((_event, newInputValue) => {
        setInputValue(newInputValue)
      }, 500)}
      disablePortal
      autoComplete
      isOptionEqualToValue={(option, value) => option.value === value.value}
      multiple={restProps.multiple}
      freeSolo={freeSolo}
      onChange={onChange}
      selectOnFocus={!freeSolo}
      clearOnBlur={!freeSolo}
      onBlur={(e) => {
        if (freeSolo && inputValue.trim() !== '') {
          handleAddNewOption(inputValue.trim())
          setInputValue('')
        }
        onBlur(e)
      }}
      {...restProps}
    />
  )
}

export default Autocomplete
