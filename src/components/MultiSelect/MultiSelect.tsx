import { type FC, useState, type KeyboardEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Chip, TextField } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import styles from './multiSelect.module.scss'

export interface Option {
  name: string
  id: string
}

const MultiSelect: FC<{
  options: Option[]
  onChange: (selectedOptions: Option[]) => void
  label?: string
  placeholder?: string
  emptyOptionsMessage?: string
  initialSelectedOptions?: Option[] // Nuevo prop para opciones seleccionadas inicialmente
}> = ({
  options,
  onChange,
  label,
  placeholder,
  emptyOptionsMessage,
  initialSelectedOptions = [], // Por defecto, no hay opciones seleccionadas inicialmente
}) => {
  const { t } = useTranslation()
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(initialSelectedOptions) // Inicializar con las opciones seleccionadas inicialmente
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isOptionsListVisible, setIsOptionsListVisible] = useState<boolean>(false)
  const [rotateIcon, setRotateIcon] = useState<number>(0)

  const availableOptions = options.filter(
    (option) => !selectedOptions.some((selectedOption) => selectedOption.id === option.id)
  )

  const filteredOptions = availableOptions.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectOption = (option: Option): void => {
    const newSelectedOptions = [...selectedOptions, option]
    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  const handleRemoveOption = (optionToRemove: Option): void => {
    const newSelectedOptions = selectedOptions.filter((option) => option.id !== optionToRemove.id)
    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  const handleAddOption = (): void => {
    if (searchTerm.trim() !== '') {
      const newOption: Option = { name: searchTerm.trim(), id: searchTerm.trim() }
      setSelectedOptions([...selectedOptions, newOption])
      onChange([...selectedOptions, newOption])
      setSearchTerm('')
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if ((event.key === 'Enter' || event.key === 'Tab') && searchTerm.trim() !== '') {
      event.preventDefault()
      handleAddOption()
    }
  }

  const handleInputFocus = (): void => {
    setIsOptionsListVisible(true)
    setRotateIcon(180)
  }

  const handleInputBlur = (): void => {
    setTimeout(() => {
      setIsOptionsListVisible(false)
      setRotateIcon(0)
    }, 200)
  }

  useEffect(() => {
    setSelectedOptions(initialSelectedOptions)
  }, [initialSelectedOptions])

  return (
    <div className={styles.multiSelectBox}>
      {label && (
        <p className={styles.multiSelectLabel}>
          <strong>{label}</strong>
        </p>
      )}
      <div className={styles.multiSelectInput}>
        <div className={styles.selectedTags}>
          {selectedOptions.map((option) => (
            <Chip
              key={option.id}
              label={option.name}
              onDelete={() => {
                handleRemoveOption(option)
              }}
            />
          ))}
        </div>
        <TextField
          placeholder={placeholder ?? ''}
          fullWidth
          type="text"
          variant="standard"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          sx={{ paddingTop: '5px' }}
        />
        <ArrowDropDownIcon
          sx={{ transform: `rotate(${rotateIcon}deg)` }}
          className={styles.iconArrow}
        />
      </div>
      {isOptionsListVisible && (
        <div className={styles.optionList}>
          {filteredOptions.length === 0 ? (
            <div className={styles.emptyOptionsMessage}>
              {emptyOptionsMessage ?? t('common:noResults')}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  handleSelectOption(option)
                }}
                className={styles.option}
              >
                {option.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default MultiSelect
