import { type FC, useCallback, useMemo } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Filters from 'components/Filters'
import DatePicker from 'components/DatePicker'
import { type SurveysFiltersProps } from 'Project/features/Surveys/components/SurveysFilters/types'
import Select from 'components/Select'
import entitiesToOptions from 'utils/entityToOptions.ts'
import styles from './surveysFilters.module.scss'
import { filtersToApi } from 'Project/features/Surveys/transformers'
import SurveysFilterSchema from 'Project/features/Surveys/schema/SurveysFilterSchema.ts'

const SurveysFilters: FC<SurveysFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    title: '',
    status: [],
    deliveredAtFrom: null,
    deliveredAtTo: null,
    closedAtFrom: null,
    closedAtTo: null,
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })
  const statusOptions = useMemo(
    () => [
      { id: 'open', name: t('statuses.open') },
      { id: 'pending', name: t('statuses.pending') },
      { id: 'closed', name: t('statuses.closed') },
      { id: 'failed', name: t('statuses.failed') },
    ],
    []
  )

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: SurveysFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () => await setValues(initialFilters),
    [initialFilters, setValues]
  )

  const getFieldProps = useCallback(
    (
      name: 'title' | 'status' | 'deliveredAtFrom' | 'deliveredAtTo' | 'closedAtFrom' | 'closedAtTo'
    ) => ({
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
          <TextField label={t('filters.title')} fullWidth {...getFieldProps('title')} />
          <Select
            label={t('filters.status')}
            options={entitiesToOptions(statusOptions)}
            fullWidth
            {...getFieldProps('status')}
            multiple
          />{' '}
          <DatePicker
            label={t('filters.deliveredAtFrom')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('deliveredAtFrom')}
            maxDate={values.deliveredAtTo}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('deliveredAtFrom', date)}
          />
          <DatePicker
            label={t('filters.deliveredAtTo')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('deliveredAtTo')}
            minDate={values.deliveredAtFrom}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('deliveredAtTo', date)}
          />
          <DatePicker
            label={t('filters.closedAtFrom')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('closedAtFrom')}
            maxDate={values.closedAtTo}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('closedAtFrom', date)}
          />
          <DatePicker
            label={t('filters.closedAtTo')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('closedAtTo')}
            minDate={values.closedAtFrom}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('closedAtTo', date)}
          />
        </div>
      }
    />
  )
}

export default SurveysFilters
