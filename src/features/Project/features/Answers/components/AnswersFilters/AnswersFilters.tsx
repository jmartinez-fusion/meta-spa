import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Filters from 'components/Filters'

// import Select from 'components/Select'
import Autocomplete from 'components/Autocomplete'

import { type AnswersFiltersProps } from 'Project/features/Answers/components/AnswersFilters/types'
import { filtersToApi } from 'Project/features/Answers/transformers'
import AnswersFilterSchema from 'Project/features/Answers/schema/AnswersFilterSchema'
import styles from './answersFilters.module.scss'
import Select from 'components/Select'
import { INFLUENCES_TYPES } from 'utils/constants'

const SurveysFilters: FC<AnswersFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    stakeholder: '',
    departments: [],
    positions: [],
    projectRole: [],
    influencers: [],
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Answers' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: AnswersFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () => await setValues(initialFilters),
    [initialFilters, setValues]
  )

  const getFieldProps = useCallback(
    (name: 'stakeholder' | 'departments' | 'positions' | 'projectRole' | 'influencers') => ({
      name,
      value: values[name],
      onChange: handleChange,
      onClear: async () => await setFieldValue(name, initialFilters[name]),
    }),
    [handleChange, values, setFieldValue, initialFilters]
  )

  return (
    <Filters
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      isSearching={isSearching}
      topFilters={
        <div className={styles.topFilters}>
          <TextField label={t('filters.stakeholder')} fullWidth {...getFieldProps('stakeholder')} />
          <Autocomplete
            label={t('filters.departments')}
            resourceName="departments"
            multiple
            {...getFieldProps('departments')}
            onChange={(_e: any, value: string) => {
              void setFieldValue('departments', value)
            }}
          />
          <Autocomplete
            label={t('filters.positions')}
            resourceName="positions"
            multiple
            {...getFieldProps('positions')}
            onChange={(_e: any, value: string) => {
              void setFieldValue('positions', value)
            }}
          />
          <Select
            label={t('filters.influencers')}
            options={INFLUENCES_TYPES}
            fullWidth
            multiple
            {...getFieldProps('influencers')}
          />
        </div>
      }
    />
  )
}

export default SurveysFilters
