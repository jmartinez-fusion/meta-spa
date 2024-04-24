import { type RequestError } from 'hooks/useFetch'
import { type RespondingSurvey } from 'Project/features/RespondingSurvey/types'
import useFetchSurvey from 'Project/features/RespondingSurvey/hooks/useFetchSurvey.tsx'
import { useCallback, useEffect, useState } from 'react'
import useSaveSurveyQuestion from 'Project/features/RespondingSurvey/hooks/useSaveSurveyQuestion.tsx'

interface UseRespondingSurveyProps {
  id?: string
}

interface UseRespondingSurveyReturn {
  survey?: RespondingSurvey
  loading: boolean
  loadingNext: boolean
  error: RequestError
  onNext: (data: any) => Promise<any>
  onPrevious: () => void
}

const useRespondingSurvey = ({ id }: UseRespondingSurveyProps): UseRespondingSurveyReturn => {
  const [respondingSurvey, setRespondingSurvey] = useState<RespondingSurvey | undefined>(undefined)
  const { survey, loading, error, refresh } = useFetchSurvey({ id })
  const { save, loading: loadingNext } = useSaveSurveyQuestion(id, refresh)

  const onPrevious = useCallback(() => {
    if (respondingSurvey?.previousQuestion) {
      const { questions, previousQuestion } = respondingSurvey
      const currentQuestionIndex = questions.indexOf(previousQuestion)
      const newPreviousQuestion =
        currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1] : null
      const newNextQuestion =
        currentQuestionIndex < questions.length - 1 ? questions[currentQuestionIndex + 1] : null
      const newCurrentQuestion = questions[currentQuestionIndex]

      setRespondingSurvey({
        ...respondingSurvey,
        nextQuestion: newNextQuestion,
        previousQuestion: newPreviousQuestion,
        currentQuestion: newCurrentQuestion,
      })
    }
  }, [respondingSurvey])

  useEffect(() => {
    setRespondingSurvey(survey)
  }, [survey])

  return { survey: respondingSurvey, loading, loadingNext, error, onNext: save, onPrevious }
}

export default useRespondingSurvey
