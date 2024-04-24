import { type ProcessMappingFiltersProps } from './types'
import { type FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Select from 'components/Select'
import Filters from 'components/Filters'
import useGetOptions from 'hooks/useGetOptions'
import ProcessMappingFilterSchema from 'Project/features/ProcessMapping/schema/ProcessMappingFilterSchema'
import useFetchDepartments from 'Project/features/Structure/features/Departments/hooks/useFetchDepartments'
import { filtersToApi } from 'Project/features/ProcessMapping/transformers'
import useFetchProcessMapping from 'Project/features/ProcessMapping/hooks/useFetchProcessMapping'
import entitiesToOptions from 'utils/entityToOptions'
import styles from './processMappingFilters.module.scss'

const ProcessMappingFilters: FC<ProcessMappingFiltersProps> = ({
  onCancel,
  onApply,
  initialFilters = {
    processBranch: '',
    mappedTo: [''],
    mappedStatus: [''],
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping.filters' })
  const [processBranchState, setProcessBranchState] = useState('')
  const { departments } = useFetchDepartments({
    filters: { processBranch: processBranchState },
  })
  const { processMappings } = useFetchProcessMapping({
    filters: { processBranch: processBranchState },
  })

  const { futureProcessesStatusOptions } = useGetOptions(['futureProcessesStatus'])
  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: ProcessMappingFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () =>
      await setValues({
        processBranch: '',
        mappedTo: '',
        mappedStatus: '',
      }),
    [setValues]
  )

  const getFieldProps = useCallback(
    (name: 'processBranch' | 'mappedTo' | 'mappedStatus') => ({
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
              processMappings?.filter((processMapping) => processMapping.hasChildren) ?? [],
              {
                fieldValue: 'branchCode',
                fieldLabel: 'futureProcessName',
              }
            )}
            fullWidth
            {...getFieldProps('processBranch')}
          />
          <Select
            label={t('mappedTo')}
            options={entitiesToOptions(departments?.filter((department) => department) ?? [], {
              fieldValue: 'code',
              fieldLabel: 'name',
            })}
            fullWidth
            {...getFieldProps('mappedTo')}
          />

          <Select
            label={t('mappedStatus')}
            options={futureProcessesStatusOptions}
            fullWidth
            {...getFieldProps('mappedStatus')}
          />
        </div>
      }
    />
  )
}

export default ProcessMappingFilters
