import { type ReactNode, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import { type ProjectFormValues } from 'Projects/types'
import DropZone from 'components/DropZone/DropZone'
import DatePicker from 'components/DatePicker'
import Select from 'components/Select'
import useGetOptions from 'hooks/useGetOptions'
import ProjectSchema from 'Projects/schema/ProjectSchema'
import ProjectEditionSchema from 'Projects/schema/ProjectEditionSchema'
import useProjectConfirmDialog from 'Projects/hooks/useProjectConfirmDialog'
import { projectToAPI } from 'Projects/transformers'
import styles from './projectForm.module.scss'

interface ProjectFormProps {
  onSubmit: (data: any) => void
  initialValues?: ProjectFormValues
  mode?: string
  isLoading?: boolean
  isSubmitting?: boolean
}

type FormData =
  | 'client'
  | 'industry'
  | 'licenseInformation'
  | 'startDateFrom'
  | 'startDateTo'
  | 'name'
  | 'logo'

const ProjectForm = ({
  onSubmit,
  initialValues = {
    client: '',
    industry: '',
    licenseInformation: '',
    startDateFrom: null,
    startDateTo: null,
    name: '',
    logo: '',
  },
  mode = 'create',
  isLoading = false,
  isSubmitting = false,
}: ProjectFormProps): ReactNode => {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })
  const { onClickOpenConfirm } = useProjectConfirmDialog(mode)
  const isEdition = useMemo(() => mode === 'edit', [mode])
  const isView = useMemo(() => mode === 'view', [mode])
  const { industriesOptions } = useGetOptions(['industries'], null)

  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    values,
    setFieldError,
  } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: isView ? ProjectEditionSchema : ProjectSchema,
    onSubmit: (data) => {
      onSubmit(projectToAPI(data))
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
          label={t('fields.client.label')}
          disabled={isView || isEdition}
          {...getFieldProps('client')}
          autoFocus
        />
        <Select
          label={t('fields.industries.label')}
          options={industriesOptions}
          disabled={isView || isEdition}
          fullWidth
          {...getFieldProps('industry')}
        />
      </div>
      <div className={styles.rowForm}>
        <TextField
          fullWidth
          multiline
          type="textarea"
          disabled={isView}
          rows={6}
          label={t('fields.licenseInformation.label')}
          {...getFieldProps('licenseInformation')}
        />
      </div>
      <div className={styles.titleSectionForm}>
        <Typography variant="h3">{t('singular')}</Typography>
      </div>
      <div className={styles.gridForm3}>
        <TextField
          fullWidth
          disabled={isView}
          label={t('fields.name.label')}
          {...getFieldProps('name')}
        />
        <DatePicker
          label={t('fields.startDateFrom.label')}
          slotProps={{ textField: { fullWidth: true } }}
          disabled={isView}
          {...getFieldProps('startDateFrom')}
          maxDate={values.startDateTo}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={async (date) => await setFieldValue('startDateFrom', date)}
        />
        <DatePicker
          label={t('fields.startDateTo.label')}
          slotProps={{ textField: { fullWidth: true } }}
          disabled={isView}
          {...getFieldProps('startDateTo')}
          minDate={values.startDateFrom}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={async (date: any) => await setFieldValue('startDateTo', date)}
        />
      </div>
      <div className={styles.rowForm}>
        {(isView || isEdition) && values.logo && (
          <div className={styles.previewImage}>
            <img
              src={
                values.logo instanceof File
                  ? URL.createObjectURL(values.logo)
                  : `data:image/png;base64,${
                      values.logo.startsWith('data:') ? values.logo.split(',')[1] : values.logo
                    }`
              }
              alt="preview"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        )}
        {!isView && (
          <DropZone
            maxFiles={1}
            label={t('fields.logo.label')}
            acceptedFileExtensions={['png', 'jpg', 'jpeg']}
            {...getFieldProps('logo')}
            onChange={(file) => {
              void setFieldValue('logo', file)
            }}
            onError={(errorCode) => {
              if (Array.isArray(errorCode)) {
                errorCode = errorCode.join(', ')
              }
              setFieldError('logo', errorCode)
            }}
            logoDefault={values.logo}
            recommendedSize={{ min: 60, max: 200 }}
          />
        )}
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

export default ProjectForm
