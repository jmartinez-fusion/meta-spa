import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, type FC } from 'react'
import { useFormik } from 'formik'
import RoleFilterSchema from 'src/features/Roles/schema/RoleFilterSchema'
import Filters from 'src/components/Filters/index.ts'

interface RoleFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  isSearching?: boolean
  initialFilters?: {
    name: string
  }
}

const RoleFilters: FC<RoleFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    name: '',
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Roles.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: RoleFilterSchema,
    onSubmit: (data) => {
      onApply(data)
    },
  })

  const handleClear = useCallback(async () => {
    await setValues(initialFilters)
  }, [initialFilters, setValues])

  const getFieldProps = useCallback(
    (name: string) => ({
      name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      value: values[name],
      onChange: handleChange,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onClear: async () => await setFieldValue(name, initialFilters[name]),
    }),
    [handleChange, values, initialFilters, setFieldValue]
  )

  return (
    <Filters
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={<TextField label={t('name')} fullWidth {...getFieldProps('name')} />}
      isSearching={isSearching}
    />
  )
}

export default RoleFilters
