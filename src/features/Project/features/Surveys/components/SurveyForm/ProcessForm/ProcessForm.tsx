import styles from './processForm.module.scss'
import { useTranslation } from 'react-i18next'
import { type FC } from 'react'
import Select from 'components/Select'
import { Typography } from '@mui/material'
import entitiesToOptions from 'utils/entityToOptions.ts'
import { type SurveyProcess } from 'Project/features/Surveys/types'

export interface ProcessFormProps {
  processOptions: SurveyProcess[]
  getFieldProps: (field: any) => any
  setFieldValue: (field: any, value: any) => any
}

const ProcessForm: FC<ProcessFormProps> = ({ processOptions, getFieldProps, setFieldValue }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })
  const stepOptions = getFieldProps('process')?.value
    ? processOptions.filter(
        (processOption) => processOption.id === getFieldProps('process')?.value
      )[0]?.steps
    : []

  return (
    <div className={styles.container}>
      <Typography variant="h3">{t('associateToProcess')}</Typography>
      <Select
        label={t('fields.process')}
        options={entitiesToOptions(processOptions)}
        onClear={() => setFieldValue('process', '')}
        fullWidth
        {...getFieldProps('process')}
      />
      <div className={styles.doubleContainer}>
        <Select
          label={t('fields.startStep')}
          options={entitiesToOptions(stepOptions)}
          onClear={() => setFieldValue('startStep', '')}
          fullWidth
          {...getFieldProps('startStep')}
        />
        <Select
          label={t('fields.endStep')}
          options={entitiesToOptions(stepOptions)}
          onClear={() => setFieldValue('endStep', '')}
          fullWidth
          {...getFieldProps('endStep')}
        />
      </div>
    </div>
  )
}

export default ProcessForm
