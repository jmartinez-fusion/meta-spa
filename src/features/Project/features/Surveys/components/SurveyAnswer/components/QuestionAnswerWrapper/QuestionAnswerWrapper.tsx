import c from 'classnames'
import QuestionPresentation from 'src/features/Project/components/QuestionPresentation'
import { type QuestionAnswerWrapperProps } from 'Project/features/Surveys/components/SurveyAnswer/components/QuestionAnswerWrapper/types'
import { useTranslation } from 'react-i18next'
import dateFormat from 'utils/dateFormat.ts'
import LinkWithTextBlockAction from 'Project/components/LinkWithTextBlockAction/LinkWithTextBlockAction.tsx'
import { type FC } from 'react'
import styles from './questionAnswerWrapper.module.scss'

const QuestionAnswerWrapper: FC<QuestionAnswerWrapperProps> = ({
  children,
  module,
  question,
  selected,
  onLinkWithTextBlock,
}) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys.answer' })

  return (
    <div className={c(styles.content, selected && styles.selected)}>
      <div className={styles.mainContent}>
        <div>{children}</div>
        <div>
          <LinkWithTextBlockAction onLinkWithTextBlock={onLinkWithTextBlock} />
        </div>
      </div>
      <div className={styles.lastAnswered}>
        <div className={styles.label}>{t('lastAnswered')}</div>
        <div className={styles.value}>
          {question.answer?.answeredAt
            ? dateFormat(question.answer?.answeredAt, 'MM/DD/YYYY HH:mm')
            : '-'}
        </div>
      </div>
      <QuestionPresentation module={module} question={question} />
    </div>
  )
}

export default QuestionAnswerWrapper
