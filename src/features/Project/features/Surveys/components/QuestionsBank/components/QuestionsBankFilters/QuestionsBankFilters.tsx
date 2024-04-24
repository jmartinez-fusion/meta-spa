import { type FC, useCallback } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import Filters from 'components/Filters'
import { type QuestionsBankFiltersProps } from 'Project/features/Surveys/components/QuestionsBank/components/QuestionsBankFilters/types'
import styles from './questionsBankFilters.module.scss'
import { filtersToApi } from 'Project/features/Surveys/components/QuestionsBank/transformers'
import Autocomplete from 'components/Autocomplete'

const QuestionsBankFilters: FC<QuestionsBankFiltersProps> = ({
  onCancel,
  onApply,
  isSearching = false,
  initialFilters = {
    question: '',
    categories: [],
    industries: [],
  },
}) => {
  const { t } = useTranslation('common')

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    onSubmit: (data) => {
      onApply(filtersToApi(data))
    },
  })

  const handleClear = useCallback(
    async () => await setValues(initialFilters),
    [initialFilters, setValues]
  )

  const getFieldProps = useCallback(
    (name: 'question' | 'categories' | 'industries') => ({
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
      isSearching={isSearching}
      topFilters={
        <div className={styles.topFilters}>
          <TextField label={t('search')} fullWidth {...getFieldProps('question')} />
        </div>
      }
      bottomFilters={
        <div className={styles.bottomFilters}>
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
          <Autocomplete
            label={t('industries')}
            resourceName="industries"
            multiple
            fullWidth
            {...getFieldProps('industries')}
            onChange={(_e: any, value: string) => {
              void setFieldValue('industries', value)
            }}
          />
        </div>
      }
    />
  )
}

export default QuestionsBankFilters
