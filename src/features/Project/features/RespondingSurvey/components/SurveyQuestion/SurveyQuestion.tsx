import { type FC } from 'react'
import CaptureQuestion from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/CaptureQuestion'
import DropdownQuestion from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/DropdownQuestion'
import { type SurveyQuestionProps } from 'Project/features/RespondingSurvey/components/SurveyQuestion/types'
import ParagraphQuestion from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/ParagraphQuestion'

const SurveyQuestion: FC<SurveyQuestionProps> = ({ module, question, onNext, onPrevious }) => {
  const props = { module, question, onNext, onPrevious }
  switch (question?.type) {
    case 'capture':
      return <CaptureQuestion {...props} />

    case 'dropdown':
      return <DropdownQuestion {...props} />

    case 'paragraph':
      return <ParagraphQuestion {...props} />

    default:
      return null
  }
}

export default SurveyQuestion
