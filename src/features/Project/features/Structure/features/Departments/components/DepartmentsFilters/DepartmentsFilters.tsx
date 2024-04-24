import { type DepartmentsFiltersProps } from './types'
import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import DepartmentsFilterSchema from 'Project/features/Structure/features/Departments/schema/DepartmentsFilterSchema.ts'
import Filters from 'components/Filters'
import styles from './departmentsFilters.module.scss'
import { filtersToApi } from 'Project/features/Structure/features/Departments/transformers'

const DepartmentsFilters: FC<DepartmentsFiltersProps> = ({
  onCancel,
  onApply,
  initialFilters = {
    name: '',
    parentName: '',
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Departments.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: DepartmentsFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () => await setValues(initialFilters),
    [initialFilters, setValues]
  )

  const getFieldProps = useCallback(
    (name: 'name' | 'parentName') => ({
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
          <TextField label={t('parentName')} fullWidth {...getFieldProps('parentName')} />
        </div>
      }
    />
  )
}

export default DepartmentsFilters
