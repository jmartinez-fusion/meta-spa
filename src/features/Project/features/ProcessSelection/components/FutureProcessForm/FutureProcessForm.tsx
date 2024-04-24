import { type FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import FutureProcessSchema from 'Project/features/ProcessSelection/schema/FutureProcessSchema'
import { type FutureProcessFormProps } from './types'
import { LoadingButton } from '@mui/lab'
import LoadingRing from 'components/LoadingRing'
import useFutureProcessFormConfirmDialog from 'Project/features/ProcessSelection/hooks/useFutureProcessFormConfirmDialog.ts'
import styles from './futureProcessForm.module.scss'
import useProject from 'Project/hooks/useProject.ts'
import Select from 'components/Select'
import useFetchFutureProcesses from 'Project/features/ProcessSelection/hooks/useFetchFutureProcesses.tsx'
import { type FutureProcess } from 'Project/features/ProcessSelection/types'
import useFetchSPCs from 'Project/features/ProcessSelection/hooks/useFetchSPCs.tsx'
import { futureProcessToApi } from 'Project/features/ProcessSelection/transformers'

const DEFAULT_INITIAL_VALUES = { name: '', parentFutureProcess: '', associatedSPC: '', code: '' }

type FutureProcessList = Array<{ id: string; value: string; name: string; branchCode: string }>

const RolesForm: FC<FutureProcessFormProps> = ({
  onSubmit,
  initialValues = DEFAULT_INITIAL_VALUES,
  mode = 'create',
  isLoading = false,
  isSubmitting = false,
}) => {
  const { t, i18n } = useTranslation(['features'], { keyPrefix: 'ProcessSelection.form' })
  const { onClickOpenConfirm } = useFutureProcessFormConfirmDialog(mode)
  const { project } = useProject()
  const { futureProcesses } = useFetchFutureProcesses()
  const { SPCs } = useFetchSPCs()
  const [parentFutureProcessOptions, setParentFutureProcessOptions] = useState<FutureProcessList>(
    []
  )
  const [branchCodeSelected, setBranchCodeSelected] = useState('')
  const { industry } = project ?? {}

  const optionsListOfFutureProcesses = useCallback(
    (futureProcesses: FutureProcess[] = []): FutureProcessList => {
      const options: FutureProcessList = []

      futureProcesses.forEach((futureProcess) => {
        options.push({
          id: futureProcess.id,
          value: futureProcess.id,
          name: futureProcess.name,
          branchCode: futureProcess.branchCode ?? '',
        })
        options.push(...optionsListOfFutureProcesses(futureProcess.subProcesses))
      })

      return options
    },
    []
  )

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    touched,
    errors,
    setValues,
    values,
  } = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: FutureProcessSchema,
    onSubmit: (data) => {
      onSubmit(futureProcessToApi({ ...data, branchCodeSelected }))
    },
  })

  const getFieldProps = useCallback(
    (name: 'name' | 'parentFutureProcess' | 'associatedSPC' | 'code') => {
      const hasTouched = touched[name]
      const hasError = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && hasError),
        helperText: hasTouched && hasError ? i18n.t(hasError) : '',
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

  useEffect(() => {
    setParentFutureProcessOptions(optionsListOfFutureProcesses(futureProcesses))
  }, [futureProcesses])

  useEffect(() => {
    let code = ''
    if (values.associatedSPC) {
      SPCs?.forEach((spc) => {
        if (spc.value === values.associatedSPC) {
          code = spc.branchCode
        }
      })
    }

    if (values.parentFutureProcess) {
      parentFutureProcessOptions?.forEach((parentFutureProcess) => {
        if (parentFutureProcess.value === values.parentFutureProcess) {
          code = parentFutureProcess.branchCode
        }
      })
    }

    setBranchCodeSelected(code + '.')
  }, [parentFutureProcessOptions, SPCs, values.associatedSPC, values.parentFutureProcess])

  if (isLoading) {
    return <LoadingRing center small />
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.formContainer}>
      <TextField fullWidth label={t('name')} {...getFieldProps('name')} />
      <TextField fullWidth label={t('industry')} value={industry} disabled />
      <div className={styles.processContainer}>
        <Select
          label={t('parentFutureProcess')}
          options={parentFutureProcessOptions}
          fullWidth
          {...getFieldProps('parentFutureProcess')}
          onChange={(event) => {
            void setFieldValue('associatedSPC', '')
            void setFieldValue('parentFutureProcess', event.target.value)
          }}
        />
        <span className={styles.or}>{t('or')}</span>
        <Select
          label={t('associatedSPC')}
          options={SPCs ?? []}
          fullWidth
          {...getFieldProps('associatedSPC')}
          onChange={(event) => {
            void setFieldValue('parentFutureProcess', '')
            void setFieldValue('associatedSPC', event.target.value)
          }}
        />
      </div>
      <div className={styles.selectedProcess}>
        <TextField fullWidth label={t('processID')} value={branchCodeSelected} disabled />
        <TextField fullWidth {...getFieldProps('code')} />
      </div>

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
    </form>
  )
}

export default RolesForm
