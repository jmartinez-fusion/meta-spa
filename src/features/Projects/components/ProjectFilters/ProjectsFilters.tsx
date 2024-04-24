import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import Select from 'src/components/Select'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { type ProjectsFiltersProps } from './types'
import Filters from 'components/Filters'
import DatePicker from 'components/DatePicker'
import useGetOptions from 'hooks/useGetOptions.ts'
import ProjectFilterSchema from 'Projects/schema/ProjectFilterSchema.ts'
import { filtersToApi } from 'Projects/transformers'
import styles from './projectFilters.module.scss'

const ProjectsFilters: FC<ProjectsFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    client: '',
    projectName: '',
    industries: [],
    startDateFrom: null,
    startDateTo: null,
    dueDateFrom: null,
    dueDateTo: null,
    createdAtFrom: null,
    createdAtTo: null,
    active: undefined,
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Projects.filters' })
  const { industriesOptions } = useGetOptions(['industries'])

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: ProjectFilterSchema,
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
      name:
        | 'client'
        | 'projectName'
        | 'active'
        | 'industries'
        | 'createdAtFrom'
        | 'createdAtTo'
        | 'startDateFrom'
        | 'startDateTo'
        | 'dueDateFrom'
        | 'dueDateTo'
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
      isSearching={isSearching}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <div className={styles.topFilters}>
          <TextField
            label={t('client')}
            placeholder={t('clientPlaceholder')}
            fullWidth
            {...getFieldProps('client')}
          />
          <TextField label={t('projectName')} fullWidth {...getFieldProps('projectName')} />
          <Select
            multiple
            label={t('industries')}
            options={industriesOptions}
            fullWidth
            {...getFieldProps('industries')}
          />
        </div>
      }
      bottomFilters={
        <div className={styles.bottomFilters}>
          <div className={styles.bottomFiltersWrapper}>
            <DatePicker
              label={t('startDateFrom')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('startDateFrom')}
              maxDate={values.startDateTo}
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onChange={async (date) => await setFieldValue('startDateFrom', date)}
            />
            <DatePicker
              label={t('startDateTo')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('startDateTo')}
              minDate={values.startDateFrom}
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onChange={async (date: any) => await setFieldValue('startDateTo', date)}
            />
          </div>
          <div className={styles.bottomFiltersWrapper}>
            <DatePicker
              label={t('dueDateFrom')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('dueDateFrom')}
              maxDate={values.dueDateTo}
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onChange={async (date) => await setFieldValue('dueDateFrom', date)}
            />
            <DatePicker
              label={t('dueDateTo')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('dueDateTo')}
              minDate={values.dueDateFrom}
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onChange={async (date: any) => await setFieldValue('dueDateTo', date)}
            />
          </div>
          <div className={styles.bottomFiltersWrapper}>
            <DatePicker
              label={t('createdAtFrom')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('createdAtFrom')}
              maxDate={values.createdAtTo}
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onChange={async (date) => await setFieldValue('createdAtFrom', date)}
            />
            <DatePicker
              label={t('createdAtTo')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('createdAtTo')}
              minDate={values.createdAtFrom}
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onChange={async (date: any) => await setFieldValue('createdAtTo', date)}
            />
          </div>
        </div>
      }
    ></Filters>
  )
}

export default ProjectsFilters
