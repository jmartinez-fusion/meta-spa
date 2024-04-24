import SurveyQuestion, {
  type SurveyQuestionAsJson,
  type SurveyQuestionFromJson,
  type SurveyQuestionType,
} from 'Project/features/RespondingSurvey/models/SurveyQuestion'
import { answerFromJson } from 'Project/features/RespondingSurvey/transformers'
import { type Answer } from 'Project/features/RespondingSurvey/types'

export interface SurveyCaptureQuestionFromJson extends SurveyQuestionFromJson {
  description?: string
  metadata: {
    process: string
    startStep: string
    endStep: string
  }
}

export interface SurveyCaptureQuestionAsJson extends SurveyQuestionAsJson {
  process: string
  startStep: string
  endStep: string
}

class SurveyCaptureQuestion extends SurveyQuestion {
  process: string
  startStep: string
  endStep: string

  constructor(
    id: string,
    type: SurveyQuestionType = 'capture',
    process: string,
    startStep: string,
    endStep: string,
    answer: Answer,
    title?: string
  ) {
    super(id, type, answer, title)
    this.process = process
    this.startStep = startStep
    this.endStep = endStep
  }

  get asJson(): SurveyCaptureQuestionAsJson {
    return {
      ...super.asJson,
      process: this.process,
      startStep: this.startStep,
      endStep: this.endStep,
    }
  }

  clone(): SurveyCaptureQuestion {
    return new SurveyCaptureQuestion(
      this.id,
      this.type,
      this.process,
      this.startStep,
      this.endStep,
      this.answer,
      this.title
    )
  }

  static fromJson({
    id,
    type,
    metadata,
    title,
    answer,
  }: SurveyCaptureQuestionFromJson): SurveyCaptureQuestion {
    return new SurveyCaptureQuestion(
      id,
      type,
      metadata.process,
      metadata.startStep,
      metadata.endStep,
      answerFromJson(answer),
      title
    )
  }
}

export default SurveyCaptureQuestion
