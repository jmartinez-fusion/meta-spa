import {
  type Answer,
  type AnswerFromApi,
  type QuestionProcess,
  type QuestionProcessFromJson,
  type RespondingSurvey,
  type RespondingSurveyFromApi,
  type SurveyStatus,
  type SurveyStatusValue,
} from 'Project/features/RespondingSurvey/types'
import SurveyQuestionFactory from 'Project/features/RespondingSurvey/models/SurveyQuestionFactory'
import dayjs from 'dayjs'
import PresentationType from 'Project/features/PresentationTool/types/PresentationType.ts'
import { findLastDate } from 'utils/findLastDate.ts'

export const surveyStatusFromApi = (status: SurveyStatusValue): SurveyStatus => {
  return {
    status,
    isClosed: status === 'closed',
    isOpen: status === 'open',
    isPaused: status === 'paused',
    isPending: status === 'pending',
  }
}

export const answerFromJson = (answer: AnswerFromApi | undefined): Answer => {
  const { respondedAt, response, id } = answer ?? {}
  return {
    id,
    answeredAt: respondedAt ? dayjs(respondedAt) : undefined,
    response: response?.response,
  }
}

export const questionProcessFromJson = ({
  name,
  id,
  templateBlocks,
}: QuestionProcessFromJson): QuestionProcess => {
  return {
    name,
    id,

    steps: templateBlocks?.map(({ templateBlock }) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      PresentationType[templateBlock.type]?.(templateBlock)
    ),
  }
}

export const surveyFromApi = ({
  id,
  status,
  module,
  title,
  questions: questionsFromApi,
}: RespondingSurveyFromApi): RespondingSurvey => {
  const questions = questionsFromApi.map((question) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return SurveyQuestionFactory[question.type]?.(question)
  })
  const lastSavedQuestionId = [...questions]
    .reverse()
    .find((question) => question?.answer.answeredAt)?.id

  const progress = questions?.length
    ? (questions.reduce(
        (total, question) => (question?.answer?.answeredAt ? total + 1 : total),
        0
      ) /
        questions.length) *
      100
    : 0

  let currentQuestion = null
  let previousQuestion = null
  let nextQuestion = null

  if (lastSavedQuestionId) {
    const lastAnsweredAt = findLastDate(
      questions
        .filter((question) => !!question?.answer?.answeredAt)
        .map((question) => question?.answer?.answeredAt)
    )

    const lastSavedIndex = [...questions].findIndex(
      (question) => lastAnsweredAt && question?.answer.answeredAt === lastAnsweredAt
    )
    if (lastSavedIndex === questions.length - 1) {
      currentQuestion = questions[lastSavedIndex]
      previousQuestion = questions.length > 1 ? questions[lastSavedIndex - 1] : null
      nextQuestion = null
    } else {
      previousQuestion = questions[lastSavedIndex]
      currentQuestion = questions[lastSavedIndex + 1]
      nextQuestion = lastSavedIndex + 2 < questions.length ? questions[lastSavedIndex + 2] : null
    }
  } else {
    currentQuestion = questions[0]
    nextQuestion = questions.length > 1 ? questions[1] : null
  }

  previousQuestion = lastSavedQuestionId ? previousQuestion : null

  return {
    id,
    status: surveyStatusFromApi(status),
    title,
    questions,
    module,
    previousQuestion,
    currentQuestion,
    nextQuestion,
    progress,
  }
}

export const surveyDropdownQuestionToApi = (data: any = {}): any => {
  const { response, question } = data
  return {
    questionId: question?.id,
    response: { response },
  }
}

export const surveyParagraphQuestionToApi = (data: any = {}): any => {
  const { response, question } = data
  return {
    questionId: question?.id,
    response: { response },
  }
}
