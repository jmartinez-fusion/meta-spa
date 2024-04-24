import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './surveyFinished.module.scss'

const SurveyFinished: FC = () => {
  const { t } = useTranslation('features', { keyPrefix: 'RespondingSurvey' })

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>{t('end')}</div>
      <div className={styles.description}>{t('endDescription')}</div>
    </div>
  )
}

export default SurveyFinished
