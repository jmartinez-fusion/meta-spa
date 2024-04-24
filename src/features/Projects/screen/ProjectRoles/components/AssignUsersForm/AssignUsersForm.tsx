import { type ReactNode, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import Select from 'components/Select'
import entitiesToOptions from 'utils/entityToOptions.ts'
import { type ProjectUser } from 'Projects/types'
import styles from './assignUsersForm.module.scss'

interface ProjectFormProps {
  onSubmit: (data: any) => void
  initialValues?: {
    user: string
  }
  options?: ProjectUser[]
  isLoading?: boolean
  isSubmitting?: boolean
}

type FormData = 'user'

const AssignUsersForm = ({
  onSubmit,
  options = [],
  initialValues = {
    user: '',
  },
  isSubmitting = false,
}: ProjectFormProps): ReactNode => {
  const { t } = useTranslation('features', { keyPrefix: 'Projects' })

  const { handleChange, handleSubmit, handleBlur, touched, errors, values, setFieldValue } =
    useFormik({
      initialValues,
      validateOnChange: false,
      validationSchema: undefined,
      onSubmit: (data) => {
        onSubmit(data)
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
        onClear: async () => await setFieldValue(name, initialValues[name]),
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values]
  )

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.form}>
      <Select
        label={t('projectRoles.availableUsers')}
        options={entitiesToOptions(options)}
        fullWidth
        {...getFieldProps('user')}
      />
      <LoadingButton
        type="submit"
        variant="outlined"
        loading={isSubmitting}
        sx={{ minWidth: 'unset !important' }}
      >
        {t('add')}
      </LoadingButton>
    </form>
  )
}

export default AssignUsersForm
