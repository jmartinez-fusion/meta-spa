import { type PositionsFiltersProps } from './types'
import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import PositionsFilterSchema from 'Project/features/Structure/features/Positions/schema/PositionsFilterSchema.ts'
import Filters from 'components/Filters'
import styles from './positionsFilters.module.scss'
import { filtersToApi } from 'Project/features/Structure/features/Positions/transformers'
import DatePicker from 'components/DatePicker'
const PositionsFilters: FC<PositionsFiltersProps> = ({
  onCancel,
  onApply,
  initialFilters = {
    name: '',
    code: '',
    updatedAtFrom: null,
    updatedAtTo: null,
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Positions.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: PositionsFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(async () => await setValues(initialFilters), [initialFilters])

  const getFieldProps = useCallback(
    (name: 'name' | 'code' | 'updatedAtFrom' | 'updatedAtTo') => ({
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
      topFilters={
        <div className={styles.topFilters}>
          <TextField label={t('name')} fullWidth {...getFieldProps('name')} />
          <TextField label={t('code')} fullWidth {...getFieldProps('code')} />
          <DatePicker
            label={t('updatedAtFrom')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('updatedAtFrom')}
            maxDate={values.updatedAtFrom}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('updatedAtFrom', date)}
          />
          <DatePicker
            label={t('updatedAtTo')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('updatedAtTo')}
            maxDate={values.updatedAtTo}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('updatedAtTo', date)}
          />
        </div>
      }
    />
  )
}

export default PositionsFilters
