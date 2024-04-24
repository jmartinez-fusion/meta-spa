import SurveyCaptureQuestion, {
  type SurveyCaptureQuestionFromJson,
} from 'Project/features/RespondingSurvey/models/SurveyCaptureQuestion'

import SurveyDropdownQuestion, {
  type SurveyDropdownQuestionFromJson,
} from 'Project/features/RespondingSurvey/models/SurveyDropdownQuestion'

import SurveyParagraphQuestion, {
  type SurveyParagraphQuestionFromJson,
} from 'Project/features/RespondingSurvey/models/SurveyParagraphQuestion'

export const CAPTURE_QUESTION_TYPE = 'capture'
export const DROPDOWN_QUESTION_TYPE = 'dropdown'
export const PARAGRAPH_QUESTION_TYPE = 'paragraph'

export default {
  [CAPTURE_QUESTION_TYPE]: (props: SurveyCaptureQuestionFromJson) =>
    SurveyCaptureQuestion.fromJson(props),
  [DROPDOWN_QUESTION_TYPE]: (props: SurveyDropdownQuestionFromJson) =>
    SurveyDropdownQuestion.fromJson(props),
  [PARAGRAPH_QUESTION_TYPE]: (props: SurveyParagraphQuestionFromJson) =>
    SurveyParagraphQuestion.fromJson(props),
}
