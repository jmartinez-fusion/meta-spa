import React from 'react'
import { type QuestionWrapperProps } from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/QuestionWrapper/types'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import QuestionPresentation from 'src/features/Project/components/QuestionPresentation'
import styles from './questionWrapper.module.scss'

const QuestionWrapper: React.FC<QuestionWrapperProps> = ({
  children,
  module,
  question,
  onNext,
  onPrevious,
  loadingNext = false,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'RespondingSurvey' })

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        {onPrevious && (
          <Button
            variant="outlined"
            color="primary"
            disabled={loadingNext}
            startIcon={<ArrowBack />}
            onClick={onPrevious}
          >
            {t(`previousQuestion`)}
          </Button>
        )}
        {onNext && (
          <LoadingButton
            size="large"
            type="submit"
            onClick={onNext}
            variant="contained"
            color="primary"
            loading={loadingNext}
            endIcon={<ArrowForward />}
          >
            {t(`nextQuestion`)}
          </LoadingButton>
        )}
      </div>
      <div className={styles.content}>{children}</div>
      <QuestionPresentation module={module} question={question} />
    </div>
  )
}

export default QuestionWrapper
