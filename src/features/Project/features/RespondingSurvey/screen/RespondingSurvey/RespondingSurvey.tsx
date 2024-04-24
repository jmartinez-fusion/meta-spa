import { lazy, type ReactNode, Suspense, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import LoadingRing from 'components/LoadingRing'
import SurveyQuestion from 'src/features/Project/features/RespondingSurvey/components/SurveyQuestion'
import useRespondingSurvey from 'Project/features/RespondingSurvey/hooks/useRespondingSurvey'
import loadable from 'components/Loadable'
import SurveyWelcome from 'Project/features/RespondingSurvey/components/SurveyWelcome'
import styles from './respondingSurvey.module.scss'

const SurveyFinished = loadable(
  lazy(async () => await import('Project/features/RespondingSurvey/components/SurveyFinished'))
)

export default function RespondingSurvey(): ReactNode {
  const navigate = useNavigate()
  const { surveyId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const surveyEnded = searchParams.get('ended')
  const autoNext = searchParams.get('autoNext')
  const [welcomeShowed, setWelcomeShowed] = useState<boolean>(false)
  const { survey, loading, onNext, loadingNext, onPrevious } = useRespondingSurvey({ id: surveyId })
  const { previousQuestion, currentQuestion } = survey ?? {}
  const showWelcome =
    !welcomeShowed &&
    !previousQuestion &&
    currentQuestion === survey?.questions[0] &&
    survey?.questions.filter((question) => !!question?.answer?.answeredAt).length === 0
  const showSurveyEnd =
    surveyEnded && currentQuestion === survey?.questions[survey?.questions.length - 1]

  const handleNext = useCallback(
    (data: any) => {
      void onNext(data).then(() => {
        if (currentQuestion === survey?.questions[survey?.questions.length - 1]) {
          setSearchParams({ ended: 'true' })
        } else {
          setSearchParams({})
        }
      })
    },
    [onNext]
  )

  useEffect(() => {
    if (currentQuestion?.type === 'capture' && autoNext === currentQuestion.id) {
      handleNext({ questionId: currentQuestion.id })
    }
  }, [currentQuestion, autoNext])

  if (loading || loadingNext) {
    return <LoadingRing center small />
  }

  // show closed survey
  if (survey?.status.isClosed || survey?.status.isPaused) {
    navigate('/410')
  }

  return (
    <div className={styles.wrapper}>
      {survey?.title && <div className={styles.surveyTitle}>{survey?.title}</div>}
      <Suspense>
        {survey &&
          (showWelcome ? (
            <SurveyWelcome
              onNext={() => {
                setWelcomeShowed(true)
              }}
            />
          ) : showSurveyEnd ? (
            <SurveyFinished />
          ) : (
            <>
              <div className={styles.progressContainer}>
                <LinearProgress
                  color="primary"
                  value={survey?.progress}
                  variant="determinate"
                  sx={{ height: '20px !important' }}
                />
              </div>
              <SurveyQuestion
                module={survey.module}
                question={survey?.currentQuestion}
                onNext={handleNext}
                onPrevious={previousQuestion ? onPrevious : undefined}
              />
            </>
          ))}
      </Suspense>
    </div>
  )
}
