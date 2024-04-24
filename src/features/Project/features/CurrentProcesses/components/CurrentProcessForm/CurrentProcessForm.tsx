import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useFormik } from 'formik'
import Autocomplete from 'components/Autocomplete'
import useCurrentProcessFormConfirmDialog from 'Project/features/CurrentProcesses/hooks/useCurrentProcessConfirmDialog'
import CurrentProcessSchema from 'Project/features/CurrentProcesses/schema/CurrentProcessSchema'
import { CurrentProcessToAPI } from 'Project/features/CurrentProcesses/transformers'
import { type CurrentProcessFormValues } from 'Project/features/CurrentProcesses/types'
import styles from './currentProcessForm.module.scss'

interface CurrentProcessFormProps {
  onSubmit: (data: any) => void
  initialValues?: CurrentProcessFormValues
  mode?: string
  isLoading?: boolean
  isSubmitting?: boolean
}

type FormData = 'name' | 'associatedCurrentProcesses' | 'associatedSPCs'

const DEFAULT_INITIAL_VALUES = {
  name: '',
  associatedCurrentProcesses: null,
  associatedSPCs: null,
}

const CurrentProcessForm = ({
  onSubmit,
  initialValues = DEFAULT_INITIAL_VALUES,
  mode = 'create',
  isLoading = false,
  isSubmitting = false,
}: CurrentProcessFormProps): ReactNode => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { onClickOpenConfirm } = useCurrentProcessFormConfirmDialog(mode)
  const isView = useMemo(() => mode === 'details', [mode])
  const [submitAndRedirect, setSubmitAndRedirect] = useState(false)

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    touched,
    setValues,
    errors,
    values,
  } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: CurrentProcessSchema,
    onSubmit: async (data, { setSubmitting }) => {
      try {
        onSubmit(CurrentProcessToAPI({ ...data, submitAndRedirect }))
        setSubmitting(false)
      } catch (error) {
        console.error('Error', error)
      }
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

  const handleUpdateTitle = async (): Promise<void> => {
    const updateTitle = values.associatedSPCs?.name
    await setFieldValue('name', updateTitle)
  }

  const handleOnlySubmit = (): void => {
    setSubmitAndRedirect(false)
    handleSubmit()
  }

  const handleSubmitAndNavigate = (): void => {
    setSubmitAndRedirect(true)
    handleSubmit()
  }

  useEffect(() => {
    if (initialValues !== DEFAULT_INITIAL_VALUES) {
      void setValues(initialValues)
    }
  }, [initialValues])

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={styles.rowForm}>
        <div className={styles.inputForm}>
          <TextField
            fullWidth
            label={t('fields.name.label')}
            placeholder={t('fields.name.placeholder')}
            disabled={isView}
            {...getFieldProps('name')}
          />
        </div>
      </div>
      {(!isView || values?.associatedSPCs) && (
        <div className={styles.rowForm}>
          <div className={styles.inputForm}>
            <Autocomplete
              label={t('fields.associatedSPCs.label')}
              resourceName="SPCs"
              disabled={isView}
              fullWidth
              {...getFieldProps('associatedSPCs')}
              onChange={(_e: any, value: string) => {
                void setFieldValue('associatedSPCs', value)
              }}
            />
            {!isView && (
              <div className={styles.updateTitle}>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <p onClick={handleUpdateTitle}>{t('fields.associatedSPCs.updateTitle')}</p>
              </div>
            )}
          </div>
          {!isView && (
            <div className={styles.helpText}>
              <HelpOutlineIcon sx={{ fontSize: '17px' }} />
              <p>{t('fields.associatedSPCs.helpText')}</p>
            </div>
          )}
        </div>
      )}
      {(!isView || values?.associatedCurrentProcesses) && (
        <div className={styles.rowForm}>
          <div className={styles.inputForm}>
            <Autocomplete
              label={t('fields.associatedCurrentProcesses.label')}
              resourceName="currentProcessesList"
              filterName="name"
              filterOption={(option: any) => option.value !== initialValues?.id}
              disabled={isView}
              fullWidth
              {...getFieldProps('associatedCurrentProcesses')}
              onChange={(_e: any, value: string) => {
                void setFieldValue('associatedCurrentProcesses', value)
              }}
            />
          </div>
          {!isView && (
            <div className={styles.helpText}>
              <HelpOutlineIcon sx={{ fontSize: '17px' }} />
              <p>{t('fields.associatedCurrentProcesses.helpText')}</p>
            </div>
          )}
        </div>
      )}
      <div className={styles.rowBtns}>
        {!isView && (
          <>
            <p className={styles.linkCancel} onClick={onClickOpenConfirm}>
              {t('create.cancel')}
            </p>
            <LoadingButton
              variant="outlined"
              color="primary"
              disabled={isLoading}
              onClick={handleOnlySubmit}
              loading={isSubmitting && !submitAndRedirect}
            >
              {t(`${mode}.action`)}
            </LoadingButton>
          </>
        )}
        <LoadingButton
          size="large"
          onClick={handleSubmitAndNavigate}
          variant="contained"
          color="primary"
          loading={isSubmitting && submitAndRedirect}
        >
          {t(`${mode}.submit`)}
        </LoadingButton>
      </div>
    </form>
  )
}

export default CurrentProcessForm
