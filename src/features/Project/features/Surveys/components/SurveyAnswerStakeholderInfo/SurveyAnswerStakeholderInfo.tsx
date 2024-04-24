import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { type SurveyAnswerStakeholderInfoProps } from 'Project/features/Surveys/components/SurveyAnswerStakeholderInfo/types'
import styles from './surveyAnswerStakeholderInfo.module.scss'
import TableListItem from 'components/TableListItem'

const SurveyAnswerStakeholderInfo: FC<SurveyAnswerStakeholderInfoProps> = ({
  surveyStakeholder,
  lastAnswered,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys.answer' })
  const { name, influencerTypes, departments, projectRole, positions } = surveyStakeholder ?? {}

  if (!surveyStakeholder) {
    return null
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>{name}</div>
      <div className={styles.content}>
        {lastAnswered && (
          <div className={styles.item}>
            <div className={styles.itemTitle}>{t('lastAnswered')}</div>
            <div className={styles.itemContent}>{lastAnswered}</div>
          </div>
        )}
        {departments && departments.length > 0 && (
          <div className={styles.item}>
            <div className={styles.itemTitle}>{t('department')}</div>
            <div className={styles.itemContent}>
              <TableListItem items={departments.map((department) => department.name)} />
            </div>
          </div>
        )}
        {projectRole && (
          <div className={styles.item}>
            <div className={styles.itemTitle}>{t('projectRole')}</div>
            <div className={styles.itemContent}>{projectRole}</div>
          </div>
        )}
        {positions && positions.length > 0 && (
          <div className={styles.item}>
            <div className={styles.itemTitle}>{t('position')}</div>
            <div className={styles.itemContent}>
              <TableListItem items={positions} />
            </div>
          </div>
        )}
        {influencerTypes && influencerTypes.length > 0 && (
          <div className={styles.item}>
            <div className={styles.itemTitle}>{t('influencerType')}</div>
            <div className={styles.itemContent}>
              <TableListItem items={influencerTypes} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SurveyAnswerStakeholderInfo
