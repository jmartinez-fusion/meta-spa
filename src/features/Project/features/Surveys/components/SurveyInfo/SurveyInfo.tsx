import { useState, type FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'
import { EditOutlined } from '@mui/icons-material'
import dateFormat from 'utils/dateFormat'
import Autocomplete from 'components/Autocomplete'
import { type SurveyInfoProps } from 'Project/features/Surveys/components/SurveyInfo/types'
import useFetchSprintRecommended from 'Project/features/Sprints/hooks/useFetchSprintRecommended'
import SurveyChipStatus from 'Project/features/Surveys/components/SurveyChipStatus/SurveyChipStatus'
import { sprintFromApi } from 'Project/features/Sprints/transformers'
import styles from './surveyInfo.module.scss'

const surveyDefault = {
  title: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: { status: 'pending' },
}

const SurveyInfo: FC<SurveyInfoProps> = ({
  survey = surveyDefault,
  showTitle = false,
  onChangeSprint,
  getFieldProps,
  module,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })
  const { title, createdAt, updatedAt, /* statusUpdatedAt, */ status } = survey ?? surveyDefault
  const [sprintVisible, setSprintVisible] = useState(false)
  const { sprint } = useFetchSprintRecommended({ transformer: sprintFromApi })
  const [sprintCurrent, setSprintCurrent] = useState(sprint?.name ?? '')

  if (!survey) {
    return null
  }

  const handleEdit = useCallback(() => {
    setSprintVisible(true)
  }, [])

  useEffect(() => {
    setSprintCurrent(sprint?.name ?? '')
    onChangeSprint?.(null, sprint?.id ?? '')
  }, [sprint])

  return (
    <div className={styles.mainContainer}>
      {showTitle && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>
        <div className={styles.item}>
          <div className={styles.itemTitle}>{t('created')}</div>
          <div className={styles.itemContent}>{dateFormat(createdAt, 'MM/DD/YYYY HH:mm')}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.itemTitle}>{t('updated')}</div>
          <div className={styles.itemContent}>{dateFormat(updatedAt, 'MM/DD/YYYY HH:mm')}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.itemTitle}>
            <div>{t('status.label')}</div>
            <SurveyChipStatus status={status?.status} />
          </div>
          <div className={styles.itemContent}>
            {/* {dateFormat(statusUpdatedAt, 'MM/DD/YYYY HH:mm')} */}
          </div>
        </div>
        {module === 'future_state_process' && (
          <>
            {sprint && (
              <div className={styles.item}>
                <div className={styles.itemSprint}>
                  {sprintVisible ? (
                    <Autocomplete
                      label={t('sprint')}
                      name={t('sprint')}
                      variant="filled"
                      resourceName="sprints"
                      {...getFieldProps?.('sprintId')}
                      onChange={(_e: any, value: { name: string; value: string }) => {
                        onChangeSprint?.(_e, value?.value)
                        setSprintCurrent(value?.name)
                        setSprintVisible(false)
                      }}
                    />
                  ) : (
                    <div className={styles.itemContent}>
                      {sprintCurrent ?? ''}
                      <IconButton
                        onClick={handleEdit}
                        className={styles.btnActionEdit}
                        color="primary"
                        aria-label="back"
                        size="small"
                      >
                        <EditOutlined />
                      </IconButton>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SurveyInfo
