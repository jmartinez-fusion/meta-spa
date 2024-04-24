import { type MetaUserFiltersProps } from './types'
import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Select from 'components/Select'
import Filters from 'components/Filters'
import useGetOptions from 'hooks/useGetOptions'
import MetaUserFilterSchema from 'MetaUsers/schema/MetaUserFilterSchema'
import { filtersToApi } from 'MetaUsers/transformers'
import styles from './metaUsersFilters.module.scss'

const MetaUsersFilters: FC<MetaUserFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    name: '',
    email: '',
    roles: [],
    active: '',
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers.filters' })
  const { rolesOptions } = useGetOptions(['roles'])
  const statusOptions = [
    { name: t('active'), value: 'active' },
    { name: t('inactive'), value: 'inactive' },
  ]

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: MetaUserFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () => await setValues(initialFilters),
    [initialFilters, setValues]
  )

  const getFieldProps = useCallback(
    (name: 'name' | 'email' | 'roles' | 'active') => ({
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
            label={t('name')}
            placeholder={t('namePlaceholder')}
            fullWidth
            {...getFieldProps('name')}
          />
          <TextField label={t('email')} fullWidth {...getFieldProps('email')} />
          <Select
            multiple
            label={t('roles')}
            options={rolesOptions}
            fullWidth
            {...getFieldProps('roles')}
          />
          <Select
            label={t('active')}
            options={statusOptions}
            fullWidth
            {...getFieldProps('active')}
          />
        </div>
      }
    />
  )
}

export default MetaUsersFilters
