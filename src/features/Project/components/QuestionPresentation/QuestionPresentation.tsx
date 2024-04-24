import React from 'react'
import styles from './questionPresentation.module.scss'
import { type QuestionPresentationProps } from 'Project/components/QuestionPresentation/types'
import useFetchQuestionPresentation from 'Project/features/RespondingSurvey/hooks/useFetchQuestionPresentation.tsx'
import PresentationStep from 'components/PresentationStep'
import { useTranslation } from 'react-i18next'

const QuestionPresentation: React.FC<QuestionPresentationProps> = ({ module, question }) => {
  const { t } = useTranslation('features', { keyPrefix: 'RespondingSurvey' })
  const { process } = useFetchQuestionPresentation({
    module,
    processId: question.process,
    startStep: question.startStep,
    endStep: question.endStep,
  })

  if (!question.process || !process) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{t('processSteps')}</div>
      <div className={styles.processTitle}>{process?.name}</div>
      <div className={styles.steps}>
        {process?.steps?.map((presentationStep) => (
          <PresentationStep key={presentationStep?.id} readOnly step={presentationStep} />
        ))}
      </div>
    </div>
  )
}

export default QuestionPresentation
