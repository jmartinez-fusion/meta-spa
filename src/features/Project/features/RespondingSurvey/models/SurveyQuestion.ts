import { type AnswerFromApi } from 'Project/features/RespondingSurvey/types'

export interface SurveyQuestionAsJson {
  id: string
}

export type SurveyQuestionType = 'capture' | 'dropdown' | 'paragraph'

export interface SurveyQuestionFromJson {
  id: string
  type: SurveyQuestionType
  answer?: AnswerFromApi
  title?: string
  description?: string
}

class SurveyQuestion {
  id: string
  type: SurveyQuestionType
  title?: string
  description?: string
  answer: any

  constructor(
    id: string,
    type: SurveyQuestionType,
    answer: any,
    title?: string,
    description?: string
  ) {
    this.id = id
    this.type = type
    this.title = title
    this.description = description
    this.answer = answer
  }

  get asJson(): SurveyQuestionAsJson {
    return {
      id: this.id,
    }
  }
}

export default SurveyQuestion
