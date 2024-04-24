import { type StakeholdersFiltersProps } from './types'
import { type FC, useCallback, useMemo } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Filters from 'components/Filters'
import DatePicker from 'components/DatePicker'
import Autocomplete from 'components/Autocomplete'
import Gated from 'components/Gated'
import Select from 'components/Select'
import { LIST_DEPARTMENTS, LIST_POSITIONS } from 'permissions'
import { filtersToApi } from 'Project/features/Structure/features/Stakeholders/transformers'
import entitiesToOptions from 'utils/entityToOptions'
import StakeholdersFilterSchema from 'Project/features/Structure/features/Stakeholders/schema/StakeholdersFilterSchema.ts'
import styles from './stakeholdersFilters.module.scss'
import useGetOptions from 'hooks/useGetOptions'

const StakeholdersFilters: FC<StakeholdersFiltersProps> = ({
  onCancel,
  onApply,
  showDepartmentsFilter = true,
  initialFilters = {
    stakeholder: '',
    positions: [],
    departments: [],
    isManager: undefined,
    hasDepartment: undefined,
    updatedAtFrom: null,
    updatedAtTo: null,
    projectRole: '',
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Stakeholders.filters' })
  const { projectRolesOptions } = useGetOptions(['projectRoles'])
  const hasDepartmentOptions = useMemo(
    () => [
      { id: true, name: t('common:yes') },
      { id: false, name: t('common:no') },
    ],
    []
  )

  const isManagerOptions = useMemo(
    () => [
      { id: true, name: t('common:yes') },
      { id: false, name: t('common:no') },
    ],
    []
  )

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: StakeholdersFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(async () => await setValues(initialFilters), [initialFilters])

  const getFieldProps = useCallback(
    (
      name:
        | 'stakeholder'
        | 'positions'
        | 'departments'
        | 'updatedAtFrom'
        | 'updatedAtTo'
        | 'hasDepartment'
        | 'isManager'
        | 'projectRole'
    ) => ({
      name,
      value: values[name],
      onChange: handleChange,
      onClear: async () => await setFieldValue(name, initialFilters[name]),
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
        <div className={styles.topFilters}>
          <TextField
            label={t('stakeholder.label')}
            placeholder={t('stakeholder.placeholder')}
            fullWidth
            {...getFieldProps('stakeholder')}
          />
          {showDepartmentsFilter && (
            <Gated permissions={LIST_DEPARTMENTS}>
              <Autocomplete
                label={t('departments')}
                resourceName="departments"
                multiple
                fullWidth
                {...getFieldProps('departments')}
                onChange={(_e: any, value: string) => {
                  void setFieldValue('departments', value)
                }}
              />
            </Gated>
          )}
          <Gated permissions={LIST_POSITIONS}>
            <Autocomplete
              label={t('positions')}
              resourceName="positions"
              multiple
              fullWidth
              {...getFieldProps('positions')}
              onChange={(_e: any, value: string) => {
                void setFieldValue('positions', value)
              }}
            />
          </Gated>
          <Select
            label={t('isManager')}
            options={entitiesToOptions(isManagerOptions)}
            fullWidth
            {...getFieldProps('isManager')}
          />
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
          <Select
            label={t('hasDepartment')}
            options={entitiesToOptions(hasDepartmentOptions)}
            fullWidth
            {...getFieldProps('hasDepartment')}
          />
          <Select
            label={t('projectRoles')}
            options={projectRolesOptions}
            fullWidth
            {...getFieldProps('projectRole')}
          />
        </div>
      }
    />
  )
}

export default StakeholdersFilters
