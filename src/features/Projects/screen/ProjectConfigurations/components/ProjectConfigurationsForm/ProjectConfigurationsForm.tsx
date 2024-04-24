import { type ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import useProjectConfirmDialog from 'Projects/hooks/useProjectConfirmDialog'
import { projectConfigurationsToApi } from 'Projects/transformers'
import { type ProjectConfigurations } from 'Projects/types'
import ProjectConfigurationsSchema from 'Projects/schema/ProjectConfigurationsSchema.ts'
import PasswordTextField from 'components/PasswordTextField'
import Select from 'components/Select'
import styles from './projectConfigurationsForm.module.scss'

interface ProjectConfigurationsFormProps {
  onSubmit: (data: any) => void
  initialValues?: ProjectConfigurations
  mode?: string
  isLoading?: boolean
  isSubmitting?: boolean
}

type FormData =
  | 'host'
  | 'port'
  | 'protocol'
  | 'username'
  | 'senderName'
  | 'senderEmailAddress'
  | 'password'

const ProjectConfigurationsForm = ({
  onSubmit,
  initialValues = {
    host: '',
    port: '',
    protocol: '',
    username: '',
    senderName: '',
    password: '',
    senderEmailAddress: '',
  },
  mode = 'create',
  isLoading = false,
  isSubmitting = false,
}: ProjectConfigurationsFormProps): ReactNode => {
  const { i18n, t } = useTranslation('features', { keyPrefix: 'Projects.projectConfigurations' })
  const { onClickOpenConfirm } = useProjectConfirmDialog(`projectConfigurations`)
  const isView = useMemo(() => mode === 'view', [mode])

  const { handleChange, handleSubmit, handleBlur, touched, errors, values } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: ProjectConfigurationsSchema,
    onSubmit: (data) => {
      onSubmit(projectConfigurationsToApi(data))
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
        helperText: hasTouched && error ? i18n.t(error) : '',
        onBlur: () => {},
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values]
  )

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.mainContainer}>
      <div className={styles.row}>
        <TextField
          fullWidth
          label={t('fields.host')}
          disabled={isView}
          {...getFieldProps('host')}
          autoFocus
        />
        <div className={styles.portContainer}>
          <TextField
            fullWidth
            label={t('fields.port')}
            disabled={isView}
            {...getFieldProps('port')}
          />
          <Select
            label={t('fields.protocol')}
            options={[
              { value: 'ssl', name: t('ssl') },
              { value: 'tls', name: t('tls') },
            ]}
            disabled={isView}
            {...getFieldProps('protocol')}
          />
        </div>
      </div>
      <div className={styles.row}>
        <TextField
          fullWidth
          label={t('fields.username')}
          disabled={isView}
          {...getFieldProps('username')}
        />
        <PasswordTextField
          fullWidth
          label={t('fields.password')}
          disabled={isView}
          {...getFieldProps('password')}
        />
      </div>
      <div className={styles.row}>
        <TextField
          fullWidth
          label={t('fields.senderName')}
          disabled={isView}
          {...getFieldProps('senderName')}
        />
        <TextField
          fullWidth
          label={t('fields.senderEmailAddress')}
          disabled={isView}
          {...getFieldProps('senderEmailAddress')}
        />
      </div>
      {!isView && (
        <div className={styles.actions}>
          <Button
            variant="outlined"
            color="primary"
            disabled={isLoading}
            onClick={onClickOpenConfirm}
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
            {t('submit')}
          </LoadingButton>
        </div>
      )}
    </form>
  )
}

export default ProjectConfigurationsForm
