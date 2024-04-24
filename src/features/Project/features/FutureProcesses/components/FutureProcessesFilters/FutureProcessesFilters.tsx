import { type FutureProcessesFiltersProps } from './types'
import { type FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Select from 'components/Select'
import Filters from 'components/Filters'
import useGetOptions from 'hooks/useGetOptions'
import FutureProcessesFilterSchema from 'Project/features/FutureProcesses/schema/FutureProcessesFilterSchema'
import { filtersToApi } from 'Project/features/FutureProcesses/transformers'
import styles from './futureProcessesFilters.module.scss'
import useFetchFutureProcesses from '../../hooks/useFetchFutureProcesses'
import entitiesToOptions from 'utils/entityToOptions'

const FutureProcessesFilters: FC<FutureProcessesFiltersProps> = ({
  onCancel,
  onApply,
  initialFilters = {
    processBranch: '',
    status: '',
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses.filters' })
  const [processBranchState, setProcessBranchState] = useState('')
  const { futureProcesses } = useFetchFutureProcesses({
    filters: { processBranch: processBranchState },
  })

  const { futureProcessesStatusOptions } = useGetOptions(['futureProcessesStatus'])
  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: FutureProcessesFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () =>
      await setValues({
        processBranch: '',
        status: '',
      }),
    [setValues]
  )

  const getFieldProps = useCallback(
    (name: 'processBranch' | 'status') => ({
      name,
      value: values[name],
      onChange: handleChange,
      onClear: async () => await setFieldValue(name, ''),
    }),
    [handleChange, values, setFieldValue, initialFilters]
  )

  useEffect(() => {
    setProcessBranchState(initialFilters?.processBranch ?? '')
    void setValues(initialFilters)
  }, [initialFilters, setValues])

  return (
    <Filters
      onCancel={onCancel}
      onApply={handleSubmit}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClear={handleClear}
      topFilters={
        <div className={styles.topFilters}>
          <Select
            label={t('processBranch')}
            options={entitiesToOptions(
              futureProcesses?.filter((futureProcesses) => futureProcesses.hasChildren) ?? [],
              {
                fieldValue: 'branchCode',
                fieldLabel: 'futureProcessName',
              }
            )}
            fullWidth
            {...getFieldProps('processBranch')}
          />

          <Select
            label={t('reviewStatus')}
            options={futureProcessesStatusOptions}
            fullWidth
            {...getFieldProps('status')}
          />
        </div>
      }
    />
  )
}

export default FutureProcessesFilters
