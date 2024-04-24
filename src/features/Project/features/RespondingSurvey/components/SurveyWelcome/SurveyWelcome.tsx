import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { type SurveyWelcomeProps } from 'Project/features/RespondingSurvey/components/SurveyWelcome/types'
import styles from './surveyWelcome.module.scss'

const SurveyWelcome: FC<SurveyWelcomeProps> = ({ onNext }) => {
  const { t } = useTranslation('features', { keyPrefix: 'RespondingSurvey' })

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>{t('welcome')}</div>
      <div className={styles.description}>{t('welcomeDescription')}</div>
      <LoadingButton
        size="large"
        type="submit"
        onClick={onNext}
        variant="contained"
        color="primary"
      >
        {t(`start`)}
      </LoadingButton>
    </div>
  )
}

export default SurveyWelcome
