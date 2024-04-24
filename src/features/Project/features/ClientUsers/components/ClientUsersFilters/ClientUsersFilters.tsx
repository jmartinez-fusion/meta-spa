import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Filters from 'components/Filters'
import ClientUserFilterSchema from 'Project/features/ClientUsers/schema/ClientUserFilterSchema.ts'
import { type ClientUserFiltersProps } from 'Project/features/ClientUsers/components/ClientUsersFilters/types'
import { filtersToApi } from 'Project/features/ClientUsers/transformers'
import styles from './clientUsersFilters.module.scss'

const ClientUsersFilters: FC<ClientUserFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    name: '',
    email: '',
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'ClientUsers.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: ClientUserFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () => await setValues(initialFilters),
    [initialFilters, setValues]
  )

  const getFieldProps = useCallback(
    (name: 'name') => ({
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
        </div>
      }
    />
  )
}

export default ClientUsersFilters
