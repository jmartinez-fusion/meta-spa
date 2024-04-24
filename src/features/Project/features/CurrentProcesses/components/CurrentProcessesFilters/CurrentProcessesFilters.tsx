import { type CurrentProcessesFiltersProps } from './types'
import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
// import Select from 'components/Select'
import Filters from 'components/Filters'
import DatePicker from 'components/DatePicker'
// import useGetOptions from 'hooks/useGetOptions'
import CurrentProcessesFilterSchema from 'Project/features/CurrentProcesses/schema/CurrentProcessesFilterSchema'
import { filtersToApi } from 'Project/features/CurrentProcesses/transformers'
// import useFetchCurrentProcesses from 'Project/features/CurrentProcesses/hooks/useFetchCurrentProcesses'
import styles from './currentProcessesFilters.module.scss'

const CurrentProcessesFilters: FC<CurrentProcessesFiltersProps> = ({
  onCancel,
  onApply = () => null,
  initialFilters = {
    currentProcess: '',
    associatedCurrentProcess: '',
    associatedSPCProcess: '',
    spcBranch: '',
    onlyUncategorized: false,
    updatedAtFrom: '',
    updatedAtTo: '',
    status: '',
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses.filters' })
  // const { currentProcessesStatusOptions } = useGetOptions(['currentProcessesStatus'])
  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: CurrentProcessesFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () =>
      await setValues({
        currentProcess: '',
        associatedCurrentProcess: '',
        associatedSPCProcess: '',
        spcBranch: '',
        onlyUncategorized: false,
        updatedAtFrom: '',
        updatedAtTo: '',
        status: '',
      }),
    [setValues]
  )

  const getFieldProps = useCallback(
    (
      name:
        | 'currentProcess'
        | 'associatedCurrentProcess'
        | 'associatedSPCProcess'
        | 'spcBranch'
        | 'onlyUncategorized'
        | 'updatedAtFrom'
        | 'updatedAtTo'
        | 'status'
    ) => ({
      name,
      value: values[name],
      onChange: handleChange,
      onClear: async () => await setFieldValue(name, ''),
    }),
    [handleChange, values, setFieldValue, initialFilters]
  )

  return (
    <Filters
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <>
          <div className={styles.topFilters}>
            <TextField
              label={t('currentProcess')}
              placeholder={t('currentProcess')}
              fullWidth
              {...getFieldProps('currentProcess')}
            />
            <TextField
              label={t('associatedCurrentProcess')}
              placeholder={t('associatedCurrentProcess')}
              fullWidth
              {...getFieldProps('associatedCurrentProcess')}
            />
            <TextField
              label={t('associatedSPC')}
              placeholder={t('associatedSPC')}
              fullWidth
              {...getFieldProps('associatedSPCProcess')}
            />
          </div>
          <div className={styles.bottomFilters}>
            <div className={styles.spcBranch}>
              <TextField
                label={t('SPCBranch')}
                placeholder={t('SPCBranch')}
                fullWidth
                {...getFieldProps('spcBranch')}
              />
            </div>
            <DatePicker
              label={t('updatedAtFrom')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('updatedAtFrom')}
              maxDate={values.updatedAtFrom}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onChange={async (date) => await setFieldValue('updatedAtFrom', date)}
            />
            <DatePicker
              label={t('updatedAtTo')}
              slotProps={{ textField: { fullWidth: true } }}
              {...getFieldProps('updatedAtTo')}
              maxDate={values.updatedAtTo}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onChange={async (date) => await setFieldValue('updatedAtTo', date)}
            />
            {/* <Select
              label={t('reviewStatus')}
              options={currentProcessesStatusOptions}
              fullWidth
              {...getFieldProps('status')}
            /> */}
          </div>
        </>
      }
    />
  )
}

export default CurrentProcessesFilters
