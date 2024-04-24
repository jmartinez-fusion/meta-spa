import React, { useCallback } from 'react'
import QuestionWrapper from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/QuestionWrapper'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type SurveyQuestionProps } from 'Project/features/RespondingSurvey/components/SurveyQuestion/types'
import CaptureExtension from 'components/CaptureExtension'
import styles from './captureQuestion.module.scss'

const CaptureQuestion: React.FC<SurveyQuestionProps> = ({
  module,
  question,
  onNext,
  onPrevious,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'RespondingSurvey' })

  const handleOnNext = useCallback(() => {
    if (onNext) {
      onNext({ questionId: question.id })
    }
  }, [onNext])

  return (
    <QuestionWrapper
      module={module}
      question={question}
      onNext={handleOnNext}
      onPrevious={onPrevious}
    >
      <div className={styles.content}>
        <div className={styles.title}>{question.title}</div>
        <div className={styles.captureButton}>
          <CaptureExtension
            module={module}
            processId={question.process}
            redirect={`${window.location.href}?autoNext=${question.id}`}
          >
            <Button variant="contained">{t('capture')}</Button>
          </CaptureExtension>
        </div>
      </div>
    </QuestionWrapper>
  )
}

export default CaptureQuestion
