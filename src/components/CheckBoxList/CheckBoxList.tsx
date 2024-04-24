import { type FC } from 'react'
import { type CheckBoxListProps, type CheckboxOption } from 'components/CheckBoxList/types'
import CheckBoxOption from 'components/CheckBoxList/components/CheckBoxOption/CheckBoxOption.tsx'
import { SvgIcon, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import styles from './checkBoxList.module.scss'
import LoadingRing from 'components/LoadingRing'

const CheckBoxList: FC<CheckBoxListProps> = ({
  options,
  fullOptions = options,
  selectedOptionIds,
  loading = false,
  onChange,
  searchProps = {},
  disabled = false,
  recursivelySelection = true,
  showDefaultSearch = true,
}) => {
  const { t } = useTranslation('common')

  const findOptionById = (options: CheckboxOption[], id: string): CheckboxOption | undefined => {
    for (const option of options) {
      if (option.id === id) {
        return option
      }
      if (option.subOptions) {
        const foundOption = findOptionById(option.subOptions, id)
        if (foundOption) {
          return foundOption
        }
      }
    }
    return undefined
  }

  const findRootPath = (options: CheckboxOption[], id: string): CheckboxOption[] | undefined => {
    const path = []

    for (const option of options) {
      if (option.id === id) {
        return [option]
      }
      if (option.subOptions) {
        const foundOption = findOptionById(option.subOptions, id)
        if (foundOption) {
          path.push(option)

          const nextPath = findRootPath(option.subOptions, id)
          if (nextPath) {
            path.push(...nextPath)
          }

          return path
        }
      }
    }
    return undefined
  }

  const selectAll = (options: CheckboxOption[]): string[] => {
    const updatedSelectedOptions: string[] = [...selectedOptionIds]

    options.forEach((option) => {
      const isSelected = option.id && selectedOptionIds.includes(option.id)

      if (!isSelected && option.id) {
        updatedSelectedOptions.push(option.id)
      }
    })

    return updatedSelectedOptions
  }

  const unselectAllFrom = (
    option: CheckboxOption | undefined,
    selectedOptionIds: string[]
  ): string[] => {
    const updatedSelectedOptions: string[] = [...selectedOptionIds]

    const unselectOptionRecursively = (opt: CheckboxOption | undefined): void => {
      if (!opt) {
        return
      }

      const isSelected = !selectedOptionIds.includes(opt?.id ?? '')

      const optId = opt.id ?? ''
      const indexOfOption = updatedSelectedOptions.indexOf(optId)

      if (!(isSelected && indexOfOption === -1) && !isSelected && indexOfOption !== -1) {
        updatedSelectedOptions.splice(indexOfOption, 1)
      }

      if (opt.subOptions && opt.subOptions.length > 0 && recursivelySelection) {
        opt.subOptions.forEach((subOption) => {
          unselectOptionRecursively(subOption)
        })
      }
    }

    unselectOptionRecursively(option)

    return updatedSelectedOptions
  }

  const handleChange = (optionId: string): void => {
    if (disabled) {
      return
    }

    const option = findOptionById(fullOptions, optionId)
    let updatedSelectedOptionIds: string[] = []

    if (!selectedOptionIds.includes(optionId)) {
      if (recursivelySelection) {
        const rootPath = findRootPath(fullOptions, optionId)
        updatedSelectedOptionIds = selectAll(rootPath ?? [])
      } else {
        updatedSelectedOptionIds = [...selectedOptionIds].concat([optionId])
      }
    } else {
      updatedSelectedOptionIds = unselectAllFrom(option, selectedOptionIds)
    }
    onChange(updatedSelectedOptionIds)
  }

  if (loading) {
    return <LoadingRing center small />
  }

  if (disabled && selectedOptionIds.length === 0) {
    return <div className={styles.noOptions}>{t('noOptionsSelected')}</div>
  }

  return (
    <div className={styles.wrapper}>
      {!disabled && showDefaultSearch && (
        <TextField
          {...searchProps}
          placeholder={t('common:search')}
          InputProps={{
            startAdornment: (
              <SvgIcon fontSize="small" sx={{ mr: 1 }}>
                <Search />
              </SvgIcon>
            ),
          }}
        />
      )}
      <div className={styles.listWrapper}>
        {options?.map((option: CheckboxOption, i: number) => (
          <CheckBoxOption
            key={`${option.id}_option_${i}`}
            option={option}
            selectedOptionIds={selectedOptionIds}
            disabled={disabled}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}

export default CheckBoxList
