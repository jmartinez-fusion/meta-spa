import SurveyQuestion, {
  type SurveyQuestionAsJson,
  type SurveyQuestionFromJson,
  type SurveyQuestionType,
} from 'Project/features/RespondingSurvey/models/SurveyQuestion'
import { answerFromJson } from 'Project/features/RespondingSurvey/transformers'
import { type Answer } from 'Project/features/RespondingSurvey/types'

export interface SurveyDropdownQuestionFromJson extends SurveyQuestionFromJson {
  dropdownOptions: Record<string, string>
  metadata: {
    process: string
    startStep: string
    endStep: string
  }
}

export interface SurveyDropdownQuestionAsJson extends SurveyQuestionAsJson {
  process: string
  startStep: string
  endStep: string
}

class SurveyDropdownQuestion extends SurveyQuestion {
  process: string
  startStep: string
  endStep: string
  dropdownOptions?: string[]

  constructor(
    id: string,
    type: SurveyQuestionType = 'dropdown',
    process: string,
    startStep: string,
    endStep: string,
    answer: Answer,
    title?: string,
    description?: string,
    dropdownOptions?: string[]
  ) {
    super(id, type, answer, title, description)
    this.process = process
    this.startStep = startStep
    this.endStep = endStep

    this.dropdownOptions = dropdownOptions
  }

  get asJson(): SurveyDropdownQuestionAsJson {
    return {
      ...super.asJson,
      process: this.process,
      startStep: this.startStep,
      endStep: this.endStep,
    }
  }

  clone(): SurveyDropdownQuestion {
    return new SurveyDropdownQuestion(
      this.id,
      this.type,
      this.process,
      this.startStep,
      this.endStep,
      this.answer,
      this.title,
      this.description,
      this.dropdownOptions
    )
  }

  static fromJson({
    id,
    type,
    metadata,
    description,
    title,
    dropdownOptions,
    answer,
  }: SurveyDropdownQuestionFromJson): SurveyDropdownQuestion {
    return new SurveyDropdownQuestion(
      id,
      type,
      metadata.process,
      metadata.startStep,
      metadata.endStep,
      answerFromJson(answer),
      title,
      description,
      Object.keys(dropdownOptions)
    )
  }
}

export default SurveyDropdownQuestion
