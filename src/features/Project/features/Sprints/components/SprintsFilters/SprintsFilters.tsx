import { type SprintsFiltersProps } from './types'
import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Filters from 'components/Filters'
import SprintsFilterSchema from 'Project/features/Sprints/schema/SprintsFilterSchema.ts'
import styles from './sprintsFilters.module.scss'
import { filtersToApi } from 'Project/features/Sprints/transformers'
import DatePicker from 'components/DatePicker'

const SprintsFilters: FC<SprintsFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    sprint: '',
    startDate: null,
    endDate: null,
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Sprints.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: SprintsFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () => await setValues(initialFilters),
    [initialFilters, setValues]
  )

  const getFieldProps = useCallback(
    (name: 'sprint' | 'startDate' | 'endDate') => ({
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
          <TextField
            label={t('sprint')}
            fullWidth
            {...getFieldProps('sprint')}
            placeholder={t('sprintPlaceholder')}
          />
          <DatePicker
            label={t('startDate')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('startDate')}
            maxDate={values.endDate}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('startDate', date)}
          />
          <DatePicker
            label={t('endDate')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('endDate')}
            minDate={values.startDate}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('endDate', date)}
          />
        </div>
      }
    />
  )
}

export default SprintsFilters
