import { type ReactNode, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import { type SprintFormValues } from 'Project/features/Sprints/types'
import useSprintConfirmDialog from 'Project/features/Sprints/hooks/useSprintConfirmDialog.ts'
import { sprintToAPI } from 'Project/features/Sprints/transformers'
import SprintSchema from 'Project/features/Sprints/schema/SprintSchema.ts'
import styles from './sprintForm.module.scss'
import DatePicker from 'components/DatePicker'

interface MetaUserFormProps {
  onSubmit: (data: any) => void
  initialValues?: SprintFormValues
  mode?: string
  isLoading?: boolean
  isSubmitting?: boolean
}

type FormData = 'name' | 'code' | 'startDate' | 'dueDate'

const SprintForm = ({
  onSubmit,
  initialValues = {
    name: '',
    code: '',
    startDate: undefined,
    dueDate: undefined,
  },
  mode = 'create',
  isLoading = false,
  isSubmitting = false,
}: MetaUserFormProps): ReactNode => {
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Sprints' })
  const { onClickOpenConfirm } = useSprintConfirmDialog(mode)
  const isView = useMemo(() => mode === 'view', [mode])

  const { handleChange, handleSubmit, handleBlur, touched, errors, values, setFieldValue } =
    useFormik({
      initialValues,
      validateOnChange: false,
      validationSchema: SprintSchema,
      onSubmit: (data) => {
        onSubmit(sprintToAPI(data))
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

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <TextField
            fullWidth
            label={t('form.name')}
            disabled={isView}
            {...getFieldProps('name')}
            autoFocus
          />
          <TextField
            fullWidth
            label={t('form.code')}
            type="number"
            disabled={isView}
            {...getFieldProps('code')}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (e) => {
              const { value } = e.target
              const parsedInt = parseInt(value) || ''

              await setFieldValue('code', parsedInt)

              return null
            }}
          />
        </div>
        <div className={styles.bottomContainer}>
          <DatePicker
            label={t('form.startDate')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('startDate')}
            maxDate={values?.dueDate}
            disabled={isView}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('startDate', date)}
          />
          <DatePicker
            label={t('form.dueDate')}
            slotProps={{ textField: { fullWidth: true } }}
            {...getFieldProps('dueDate')}
            minDate={values?.startDate}
            disabled={isView}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={async (date) => await setFieldValue('dueDate', date)}
          />
        </div>
      </div>

      {!isView && (
        <div className={styles.actions}>
          <Button
            variant="outlined"
            color="primary"
            disabled={isLoading}
            onClick={onClickOpenConfirm}
          >
            {t(`${mode}.cancel`)}
          </Button>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
          >
            {t(`${mode}.submit`)}
          </LoadingButton>
        </div>
      )}
    </form>
  )
}

export default SprintForm
