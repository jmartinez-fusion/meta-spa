import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import {
  type Influences,
  type InfluencerDetail,
  type InfluencersFormValues,
} from 'Project/features/ProcessMapping/types'
import { influencerToApi } from 'Project/features/ProcessMapping/transformers'
import styles from './influencersForm.module.scss'

interface InfluencersFormProps {
  onSubmit: (data: any) => void
  initialValues?: InfluencersFormValues
  influencer: InfluencerDetail | undefined
  isLoading?: boolean
  isSubmitting?: boolean
  handleBack: () => void
}

type FormData = 'processId' | 'excluded' | 'influences'

const DEFAULT_INITIAL_VALUES = {
  processId: '',
  excluded: null,
  influences: {},
}

const InfluencersForm = ({
  onSubmit,
  initialValues = DEFAULT_INITIAL_VALUES,
  influencer,
  handleBack,
}: InfluencersFormProps): ReactNode => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })
  const [localExcluded, setLocalExcluded] = useState<boolean | undefined>(influencer?.excluded)
  const [localInfluences, setLocalInfluences] = useState<Influences>(
    () => (influencer?.influences ?? {}) as Influences
  )
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    setValues,
    setFieldValue,
    errors,
    values,
  } = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: async (data, { setSubmitting }) => {
      try {
        onSubmit(influencerToApi({ ...data }))
        setSubmitting(false)
      } catch (error) {
        console.error('Error', error)
      }
    },
  })

  const handleCheckboxChange = (value: string): void => {
    setLocalInfluences((prevInfluences) => {
      const updatedInfluences = { ...prevInfluences, [value]: !prevInfluences[value] }
      void setFieldValue('influences', updatedInfluences)
      return updatedInfluences
    })
  }

  const saveChanges = (): void => {
    handleSubmit()
  }

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
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values]
  )

  useEffect(() => {
    if (initialValues !== DEFAULT_INITIAL_VALUES) {
      void setValues(initialValues)
    }
    setLocalExcluded(influencer?.excluded)
    setLocalInfluences((influencer?.influences ?? {}) as Influences)
  }, [initialValues, influencer])

  return (
    <form noValidate>
      <Paper elevation={3} className={styles.influencerStatusBox}>
        <div className={styles.influencerStatusHeader}>
          <strong>{t('influencers.status')}</strong>
          <strong>{t('influencers.excluded')}</strong>
        </div>
        <div className={styles.influencerStatusContent}>
          <div className={styles.influencerStatusColumn}>
            {Object.entries(localInfluences).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={value}
                    onChange={() => {
                      handleCheckboxChange(key)
                    }}
                  />
                }
                label={key}
              />
            ))}
          </div>
          <div className={styles.influencerStatusColumn}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              className={styles.influencerStatusColumn}
              {...getFieldProps('excluded')}
              value={localExcluded ? 'true' : 'false'}
              onChange={(event) => {
                const newValue = event.target.value === 'true'
                setLocalExcluded(newValue)
                void setFieldValue('excluded', newValue)
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label={t('common:Yes')} />
              <FormControlLabel value="false" control={<Radio />} label={t('common:No')} />
            </RadioGroup>
          </div>
        </div>
      </Paper>
      <div className={styles.rowBtns}>
        <LoadingButton variant="outlined" color="primary" onClick={handleBack}>
          {t('create.cancel')}
        </LoadingButton>
        <LoadingButton variant="contained" color="primary" onClick={saveChanges}>
          {t(`create.action`)}
        </LoadingButton>
      </div>
    </form>
  )
}

export default InfluencersForm
