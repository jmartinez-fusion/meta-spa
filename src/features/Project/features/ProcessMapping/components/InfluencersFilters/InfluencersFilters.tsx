import { type InfluencersFiltersProps } from './types'
import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import Select from 'components/Select'
import Filters from 'components/Filters'
import Gated from 'components/Gated'
import Autocomplete from 'components/Autocomplete'
import { INFLUENCES_TYPES } from 'utils/constants'
import { LIST_POSITIONS } from 'permissions'
import InfluencersFilterSchema from 'Project/features/ProcessMapping/schema/InfluencersFilterSchema'
import { filtersInfluencersToApi } from 'Project/features/ProcessMapping/transformers'
import styles from './influencersFilters.module.scss'

const InfluencersFilters: FC<InfluencersFiltersProps> = ({
  onCancel,
  onApply,
  initialFilters = {
    // role: [''],
    departments: [],
    name: '',
    excluded: null,
    influences: [],
    positions: [],
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping.filters' })
  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: InfluencersFilterSchema,
    onSubmit: () => {
      onApply(filtersInfluencersToApi(values))
    },
  })

  const handleClear = useCallback(async () => await setValues(initialFilters), [setValues])

  const getFieldProps = useCallback(
    (
      name: 'departments' | 'name' | 'positions' | 'influences' | 'excluded'
      /* | 'role' */
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
            label={t('name')}
            placeholder={t('name')}
            fullWidth
            {...getFieldProps('name')}
          />
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
            label={t('influences')}
            options={INFLUENCES_TYPES}
            fullWidth
            multiple
            {...getFieldProps('influences')}
          />
          <Select
            label={t('excluded')}
            options={[
              { value: 'true', name: 'Yes' },
              { value: 'false', name: 'No' },
            ]}
            fullWidth
            {...getFieldProps('excluded')}
          />
        </div>
      }
    />
  )
}

export default InfluencersFilters
