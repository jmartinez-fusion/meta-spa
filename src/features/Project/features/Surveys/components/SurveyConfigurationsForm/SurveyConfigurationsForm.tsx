import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { LoadingButton } from '@mui/lab'
import { surveyConfigurationsToApi } from 'Project/features/Surveys/transformers'
import styles from './surveyConfigurationsForm.module.scss'
import { Button, Checkbox, FormHelperText, Radio, RadioGroup, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Autocomplete from 'components/Autocomplete'
import FormControlLabel from '@mui/material/FormControlLabel'
import SurveyConfigurationsSchema from 'Project/features/Surveys/schema/SurveyConfigurationsSchema.ts'
import DateTimePicker from 'components/DateTimePicker'

export interface SurveyConfigurationsFormValues {
  deliveredAt?: Date
  closedAt?: Date
  departments?: any[]
  includeChildren?: boolean
  includingExcluded?: boolean
  segmentation?: string
}

interface SurveyConfigurationsFormProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
  goBackPath?: string
  module: 'future_state_process' | 'current_state_process'
  mode: 'edition' | 'creation'
  initialValues?: SurveyConfigurationsFormValues
}

const SurveyConfigurationsForm: FC<SurveyConfigurationsFormProps> = ({
  onSubmit,
  mode = 'creation',
  goBackPath,
  initialValues = {
    deliveredAt: '',
    closedAt: '',
    departments: [],
    includeChildren: false,
    includingExcluded: false,
    segmentation: undefined,
  },
  // isLoading = false,
  isSubmitting = false,
}) => {
  const isEdition = mode === 'edition'
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('features', { keyPrefix: 'Surveys' })

  const { handleChange, values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: SurveyConfigurationsSchema,
    onSubmit: async (values) => {
      onSubmit(surveyConfigurationsToApi(values))
    },
  })

  const goBack = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    navigate(goBackPath)
  }, [navigate, goBackPath])

  const isCheckedExcludedForSegmentation = (
    segmentation:
      | 'allDepartmentStakeholders'
      | 'allInfluencerStakeholders'
      | 'associatedInfluencers'
  ): boolean => {
    return !!(
      getFieldProps('includingExcluded').value &&
      getFieldProps('segmentation').value === segmentation
    )
  }

  const getFieldProps = useCallback(
    (
      name:
        | 'deliveredAt'
        | 'closedAt'
        | 'departments'
        | 'includeChildren'
        | 'includingExcluded'
        | 'segmentation'
    ) => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        helperText: hasTouched && error ? i18n.t(error, { field: t(name) }) : '',
        onBlur: () => {},
        onChange: handleChange,
      }
    },
    [handleChange, touched, values, errors]
  )

  const toggleCheckbox = (name: 'includeChildren' | 'includingExcluded'): void => {
    void setFieldValue(name, !getFieldProps(name).value)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.mainContainer}>
      <Typography variant="h3">{t('deadline')}</Typography>
      <div className={styles.dateContainer}>
        <DateTimePicker
          label={t('fields.deliveredAt')}
          slotProps={{ textField: { fullWidth: true } }}
          {...getFieldProps('deliveredAt')}
          maxDate={values.closedAt}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={async (date) => await setFieldValue('deliveredAt', date)}
        />
        <DateTimePicker
          label={t('fields.closedAt')}
          slotProps={{ textField: { fullWidth: true } }}
          {...getFieldProps('closedAt')}
          minDate={values.deliveredAt}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={async (date: any) => await setFieldValue('closedAt', date)}
        />
      </div>
      <Typography variant="h3">{t('stakeholders')}</Typography>
      <div className={styles.departmentContainer}>
        <Autocomplete
          label={t('fields.departments')}
          resourceName="departments"
          multiple
          fullWidth
          {...getFieldProps('departments')}
          onChange={(_e: any, value: string) => {
            void setFieldValue('departments', value)
          }}
        />
        <div className={styles.checkbox}>
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('includeChildren')}
                onChange={() => {
                  toggleCheckbox('includeChildren')
                }}
                checked={!!getFieldProps('includeChildren').value}
              />
            }
            label={t('includeChildren')}
          />
        </div>
      </div>
      <RadioGroup
        aria-label="segmentation"
        name="segmentation"
        value={getFieldProps('segmentation').value}
        sx={{ display: 'flex', flexDirection: 'row' }}
        className={styles.segmentationContainer}
        onChange={getFieldProps('segmentation').onChange}
      >
        <div className={styles.segmentationItem}>
          <FormControlLabel
            control={<Radio />}
            value={'allDepartmentStakeholders'}
            label={t('allDepartmentStakeholders')}
          />
          <div className={styles.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps('includingExcluded')}
                  onChange={() => {
                    toggleCheckbox('includingExcluded')
                  }}
                  checked={isCheckedExcludedForSegmentation('allDepartmentStakeholders')}
                />
              }
              disabled={getFieldProps('segmentation').value !== 'allDepartmentStakeholders'}
              label={t('includingExcluded')}
            />
          </div>
        </div>
        <div className={styles.segmentationItem}>
          <FormControlLabel
            control={<Radio />}
            value={'allInfluencerStakeholders'}
            label={t('allInfluencerStakeholders')}
          />
          <div className={styles.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps('includingExcluded')}
                  onChange={() => {
                    toggleCheckbox('includingExcluded')
                  }}
                  checked={isCheckedExcludedForSegmentation('allInfluencerStakeholders')}
                />
              }
              disabled={getFieldProps('segmentation').value !== 'allInfluencerStakeholders'}
              label={t('includingExcluded')}
            />
          </div>
        </div>
        <div className={styles.segmentationItem}>
          <FormControlLabel
            control={<Radio />}
            value={'associatedInfluencers'}
            label={t('associatedInfluencers')}
          />
          <div className={styles.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps('includingExcluded')}
                  onChange={() => {
                    toggleCheckbox('includingExcluded')
                  }}
                  checked={isCheckedExcludedForSegmentation('associatedInfluencers')}
                />
              }
              disabled={getFieldProps('segmentation').value !== 'associatedInfluencers'}
              label={t('includingExcluded')}
            />
          </div>
        </div>
      </RadioGroup>
      {errors.segmentation && (
        <FormHelperText error>{getFieldProps('segmentation').helperText}</FormHelperText>
      )}
      <div className={styles.actions}>
        {isEdition && (
          <Button variant="outlined" color="primary" disabled={isSubmitting} onClick={goBack}>
            {t('configurations.cancel')}
          </Button>
        )}
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={isSubmitting}
        >
          {t('configurations.submit')}
        </LoadingButton>
      </div>
    </form>
  )
}

export default SurveyConfigurationsForm
