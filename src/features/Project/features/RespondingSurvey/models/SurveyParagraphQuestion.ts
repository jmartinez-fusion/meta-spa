import SurveyQuestion, {
  type SurveyQuestionAsJson,
  type SurveyQuestionFromJson,
  type SurveyQuestionType,
} from 'Project/features/RespondingSurvey/models/SurveyQuestion'
import { answerFromJson } from 'Project/features/RespondingSurvey/transformers'
import { type Answer } from 'Project/features/RespondingSurvey/types'

export interface SurveyParagraphQuestionFromJson extends SurveyQuestionFromJson {
  metadata: {
    process: string
    startStep: string
    endStep: string
  }
}

export interface SurveyParagraphQuestionAsJson extends SurveyQuestionAsJson {
  process: string
  startStep: string
  endStep: string
}

class SurveyParagraphQuestion extends SurveyQuestion {
  process: string
  startStep: string
  endStep: string

  constructor(
    id: string,
    type: SurveyQuestionType = 'dropdown',
    process: string,
    startStep: string,
    endStep: string,
    answer: Answer,
    title?: string,
    description?: string
  ) {
    super(id, type, answer, title, description)
    this.process = process
    this.startStep = startStep
    this.endStep = endStep
  }

  get asJson(): SurveyParagraphQuestionAsJson {
    return {
      ...super.asJson,
      process: this.process,
      startStep: this.startStep,
      endStep: this.endStep,
    }
  }

  clone(): SurveyParagraphQuestion {
    return new SurveyParagraphQuestion(
      this.id,
      this.type,
      this.process,
      this.startStep,
      this.endStep,
      this.answer,
      this.title,
      this.description
    )
  }

  static fromJson({
    id,
    type,
    metadata,
    description,
    title,
    answer,
  }: SurveyParagraphQuestionFromJson): SurveyParagraphQuestion {
    return new SurveyParagraphQuestion(
      id,
      type,
      metadata.process,
      metadata.startStep,
      metadata.endStep,
      answerFromJson(answer),
      title,
      description
    )
  }
}

export default SurveyParagraphQuestion
