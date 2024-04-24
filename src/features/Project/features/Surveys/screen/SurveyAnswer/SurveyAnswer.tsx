import { type FC, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchSurveyDetail from 'Project/features/Surveys/hooks/useFetchSurveyDetail.tsx'
import LoadingRing from 'components/LoadingRing'
import { useTranslation } from 'react-i18next'
import SurveyInfo from 'Project/features/Surveys/components/SurveyInfo'
import useFetchSurveyAnswer from 'Project/features/Surveys/hooks/useFetchSurveyAnswer.tsx'
import SurveyQuestionAnswer from 'Project/features/Surveys/components/SurveyAnswer'
import SurveyAnswerStakeholderInfo from 'Project/features/Surveys/components/SurveyAnswerStakeholderInfo'
import dateFormat from 'utils/dateFormat.ts'
import styles from './surveyAnswer.module.scss'
import TextBlockLinkerModal from 'Project/features/TextBlocks/components/TextBlockLinkerModal'

interface SurveyAnswerProps {
  module: 'future_state_process' | 'current_state_process'
  goBackPath: string
}

const SurveyAnswer: FC<SurveyAnswerProps> = ({ module }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys.answer' })
  const { surveyId, answerId } = useParams()
  const navigate = useNavigate()
  const [answerLink, setAnswerLink] = useState<string | undefined>()
  const { surveyDetail, loading } = useFetchSurveyDetail({
    id: surveyId,
  })
  const { surveyAnswer, loading: loadingSurveyAnswerDetails } = useFetchSurveyAnswer({
    surveyId,
    answerId,
  })

  const handleCloseLinking = useCallback(() => {
    setAnswerLink(undefined)
  }, [setAnswerLink])

  if (loading || loadingSurveyAnswerDetails) {
    return <LoadingRing center small />
  }

  if (surveyDetail?.type?.isCapture) {
    navigate('/404')
  }

  return (
    <div>
      <SurveyInfo module={module} showTitle survey={surveyDetail} />
      <SurveyAnswerStakeholderInfo
        surveyStakeholder={surveyAnswer?.stakeholder}
        lastAnswered={dateFormat(surveyAnswer?.lastAnsweredAt, 'MM/DD/YYYY HH:mm')}
      />
      <div className={styles.title}>{t('responses')}</div>
      <div className={styles.answers}>
        {surveyAnswer?.questions.map((question) => (
          <SurveyQuestionAnswer
            key={question.id}
            question={question}
            module={module}
            selected={question.answer.id === answerLink}
            onLinkWithTextBlock={() => {
              setAnswerLink(question.answer.id)
            }}
          />
        ))}
      </div>
      <TextBlockLinkerModal
        reference={answerLink ? { id: answerLink, type: 'survey_answer', metadata: {} } : undefined}
        handleClose={handleCloseLinking}
      />
    </div>
  )
}

export default SurveyAnswer
