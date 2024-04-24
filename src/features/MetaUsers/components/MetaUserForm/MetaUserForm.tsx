import { type ReactNode, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import useGetOptions from 'hooks/useGetOptions'
import Select from 'components/Select'
import useMetaUserFormConfirmDialog from 'MetaUsers/hooks/useMetaUserConfirmDialog'
import MetaUserSchema from 'MetaUsers/schema/MetaUserSchema'
import { metaUserToAPI } from 'MetaUsers/transformers'
import { type MetaUserFormValues } from 'MetaUsers/types'
import styles from './metaUserForm.module.scss'

interface MetaUserFormProps {
  onSubmit: (data: any) => void
  initialValues?: MetaUserFormValues
  mode?: string
  isLoading?: boolean
  isSubmitting?: boolean
}

type FormData = 'name' | 'email' | 'roles'

const MetaUserForm = ({
  onSubmit,
  initialValues = {
    name: '',
    email: '',
    roles: [],
  },
  mode = 'create',
  isLoading = false,
  isSubmitting = false,
}: MetaUserFormProps): ReactNode => {
  const { t } = useTranslation('features', { keyPrefix: 'MetaUsers' })
  const { onClickOpenConfirm } = useMetaUserFormConfirmDialog(mode)
  const isEdition = useMemo(() => mode === 'edit', [mode])
  const isView = useMemo(() => mode === 'view', [mode])
  const { rolesOptions } = useGetOptions(['roles'], null)

  const { handleChange, handleSubmit, handleBlur, touched, errors, values } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: MetaUserSchema,
    onSubmit: (data) => {
      onSubmit(metaUserToAPI(data))
    },
  })

  const getFieldProps = useCallback(
    (name: FormData) => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        helperText: hasTouched && error ? t(error) : '',
        onBlur: () => {},
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values]
  )

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={styles.rowForm}>
        <TextField
          fullWidth
          label={t('fields.name.label')}
          disabled={isView}
          {...getFieldProps('name')}
          autoFocus
        />
      </div>
      <div className={styles.rowForm}>
        <TextField
          fullWidth
          label={t('fields.email.label')}
          type="email"
          disabled={isView || isEdition}
          {...getFieldProps('email')}
        />
      </div>
      <div className={styles.rowForm}>
        <Select
          label={t('fields.roles.label')}
          options={rolesOptions}
          disabled={isView}
          multiple
          fullWidth
          {...getFieldProps('roles')}
        />
      </div>
      {!isView && (
        <div className={styles.rowBtns}>
          {!isEdition && (
            <Button
              variant="outlined"
              color="primary"
              disabled={isLoading}
              onClick={onClickOpenConfirm}
            >
              {t('create.cancel')}
            </Button>
          )}
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
          >
            {isEdition ? t('edit.submit') : t('create.submit')}
          </LoadingButton>
        </div>
      )}
    </form>
  )
}

export default MetaUserForm
