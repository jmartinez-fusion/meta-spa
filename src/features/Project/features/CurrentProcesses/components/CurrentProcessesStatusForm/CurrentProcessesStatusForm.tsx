import { type CurrentProcessesFiltersProps } from './types'
import { type FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Select from 'components/Select'
import useGetOptions from 'hooks/useGetOptions'
import styles from './currentProcessesStatusForm.module.scss'
import { Button } from '@mui/material'

const CurrentProcessesStatusForm: FC<CurrentProcessesFiltersProps> = ({
  onApply,
  onCancel,
  initialValues = {
    status: null,
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })
  const { currentProcessesStatusOptions } = useGetOptions(['currentProcessesStatus'])
  const { handleChange, values, setFieldValue, setValues, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (data) => {
      onApply(data.status)
    },
  })

  const getFieldProps = useCallback(
    (name: 'status') => ({
      name,
      value: values[name],
      onChange: handleChange,
      onClear: async () => await setFieldValue(name, initialValues[name]),
    }),
    [handleChange, values, setFieldValue, initialValues]
  )

  useEffect(() => {
    void setValues(initialValues)
  }, [initialValues])

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <div className={styles.selectForm}>
        <Select
          label={t('reviewStatus')}
          options={currentProcessesStatusOptions}
          fullWidth
          {...getFieldProps('status')}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button onClick={onCancel} variant="outlined">
          {t('cancel')}
        </Button>
        <Button type="submit">{t('save')}</Button>
      </div>
    </form>
  )
}

export default CurrentProcessesStatusForm
