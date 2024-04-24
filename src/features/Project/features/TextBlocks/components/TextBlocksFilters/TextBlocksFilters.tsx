import { type TextBlocksFiltersProps } from './types'
import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Filters from 'components/Filters'
import DatePicker from 'components/DatePicker'
import Autocomplete from 'components/Autocomplete'

import TextBlocksFilterSchema from 'Project/features/TextBlocks/schema/TextBlocksFilterSchema'
import { filtersToApi } from 'Project/features/TextBlocks/transformers'
import styles from './textBlocksFilters.module.scss'

const TextBlocksFilters: FC<TextBlocksFiltersProps> = ({
  onCancel,
  onApply = () => null,
  showBottomFilters = true,
  initialFilters = {
    question: '',
    tags: [],
    categories: [],
    createdAtFrom: null,
    createdAtTo: null,
    updatedAtFrom: null,
    updatedAtTo: null,
  },
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: TextBlocksFilterSchema,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () =>
      await setValues({
        question: '',
        tags: [],
        categories: [],
        createdAtFrom: null,
        createdAtTo: null,
        updatedAtFrom: null,
        updatedAtTo: null,
      }),
    [setValues]
  )

  const getFieldProps = useCallback(
    (
      name:
        | 'question'
        | 'tags'
        | 'categories'
        | 'createdAtFrom'
        | 'createdAtTo'
        | 'updatedAtFrom'
        | 'updatedAtTo'
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
              label={t('question')}
              placeholder={t('questionPlaceholder')}
              fullWidth
              {...getFieldProps('question')}
            />
            <Autocomplete
              label={t('tags')}
              resourceName="tags"
              multiple
              fullWidth
              {...getFieldProps('tags')}
              onChange={(_e: any, value: string) => {
                void setFieldValue('tags', value)
              }}
            />
            <Autocomplete
              label={t('categories')}
              resourceName="categories"
              multiple
              fullWidth
              {...getFieldProps('categories')}
              onChange={(_e: any, value: string) => {
                void setFieldValue('categories', value)
              }}
            />
          </div>
          {showBottomFilters && (
            <div className={styles.bottomFilters}>
              <DatePicker
                label={t('createdAtFrom')}
                slotProps={{ textField: { fullWidth: true } }}
                {...getFieldProps('createdAtFrom')}
                maxDate={values.createdAtFrom}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={async (date) => await setFieldValue('createdAtFrom', date)}
              />
              <DatePicker
                label={t('createdAtTo')}
                slotProps={{ textField: { fullWidth: true } }}
                {...getFieldProps('createdAtTo')}
                maxDate={values.createdAtTo}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={async (date) => await setFieldValue('createdAtTo', date)}
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
            </div>
          )}
        </>
      }
    />
  )
}

export default TextBlocksFilters
