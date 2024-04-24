import { type FC, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import RoleSchema from 'src/features/Roles/schema/RoleSchema'
import RoleEditionSchema from 'src/features/Roles/schema/RoleEditionSchema'
import useFetchPermissions, {
  type GroupedPermission,
} from 'src/features/Roles/hooks/useFetchPermissions'
import useRoleFormConfirmDialog from 'src/features/Roles/hooks/useRoleFormConfirmDialog.ts'
import CheckBoxList from 'components/CheckBoxList/CheckBoxList.tsx'
import { type RolesFormProps } from './types'
import useSearch from 'src/hooks/useSearch.ts'
import styles from './rolesform.module.scss'
import { LoadingButton } from '@mui/lab'
import LoadingRing from 'components/LoadingRing'

const DEFAULT_INITIAL_VALUES = { name: '', permissions: undefined, active: false }

const filter = (searchValue: string = '', options: GroupedPermission[]): GroupedPermission[] => {
  const newFilteredGroup: GroupedPermission[] = []
  options.forEach((groupedPermission) => {
    if (
      searchValue === '' ||
      groupedPermission.label.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      newFilteredGroup.push({ ...groupedPermission })
    } else {
      const subOptionsFiltered: GroupedPermission[] = []
      groupedPermission.subOptions?.forEach((subOption) => {
        if (subOption.label.toLowerCase().includes(searchValue.toLowerCase())) {
          subOptionsFiltered.push({ ...subOption })
        }
      })

      if (subOptionsFiltered.length > 0) {
        newFilteredGroup.push({ ...groupedPermission, subOptions: subOptionsFiltered })
      }
    }
  })

  return newFilteredGroup
}

const RolesForm: FC<RolesFormProps> = ({
  onSubmit,
  initialValues = DEFAULT_INITIAL_VALUES,
  mode = 'create',
  isLoading = false,
  isSubmitting = false,
}) => {
  const isView = mode === 'view'
  const { t, i18n } = useTranslation(['features'], { keyPrefix: 'Roles.form' })
  const { onClickOpenConfirm } = useRoleFormConfirmDialog(mode)
  const { groupedPermissions, permissions, loading } = useFetchPermissions()
  const { filteredOptions, handleChangeSearch } = useSearch(groupedPermissions, filter)
  const isEdition = useMemo(() => mode === 'edit', [mode])

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    setValues,
    setFieldValue,
    values,
  } = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: isEdition ? RoleEditionSchema : RoleSchema,
    onSubmit: (data) => {
      onSubmit(data)
    },
  })

  const handleChangePermissions = useCallback(
    (permissions: string[]) => {
      void setFieldValue('permissions', permissions)
    },
    [setFieldValue, values, permissions]
  )

  const getFieldProps = useCallback(
    (name: 'permissions' | 'name' | 'active') => {
      const hasTouched = touched[name]
      const hasError = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && hasError),
        helperText: hasTouched && hasError ? t(hasError) : '',
        onBlur: handleBlur,
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values, i18n]
  )

  useEffect(() => {
    if (initialValues !== DEFAULT_INITIAL_VALUES) {
      void setValues(initialValues)
    }
  }, [initialValues])

  if (isLoading) {
    return <LoadingRing center small />
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label={t('name')}
        {...getFieldProps('name')}
        disabled={isView}
        autoFocus
      />
      <div className={styles.permissionsContainer}>
        <Typography variant="h3">{t('permissions')}</Typography>
        <CheckBoxList
          loading={loading}
          searchProps={{
            onChange: handleChangeSearch,
          }}
          options={filteredOptions}
          selectedOptionIds={values.permissions ?? []}
          disabled={isView}
          onChange={handleChangePermissions}
        />
      </div>
      {!isView && (
        <div className={styles.actions}>
          <Button
            onClick={onClickOpenConfirm}
            variant="outlined"
            color="primary"
            disabled={isLoading}
          >
            {t('cancel')}
          </Button>

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
          >
            {t(mode)}
          </LoadingButton>
        </div>
      )}
    </form>
  )
}

export default RolesForm
