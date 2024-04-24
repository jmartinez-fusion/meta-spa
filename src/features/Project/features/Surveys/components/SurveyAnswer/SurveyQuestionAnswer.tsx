import { type FC } from 'react'
import { type SurveyAnswerProps } from 'Project/features/Surveys/components/SurveyAnswer/types'
import ParagraphQuestionAnswer from 'src/features/Project/features/Surveys/components/SurveyAnswer/components/ParagraphQuestionAnswer'
import DropdownQuestionAnswer from 'src/features/Project/features/Surveys/components/SurveyAnswer/components/DropdownQuestionAnswer'

const SurveyQuestionAnswer: FC<SurveyAnswerProps> = ({
  module,
  selected,
  question,
  onLinkWithTextBlock,
}) => {
  const props = { module, question, selected, onLinkWithTextBlock }
  switch (question?.type) {
    case 'dropdown':
      return <DropdownQuestionAnswer {...props} />

    case 'paragraph':
      return <ParagraphQuestionAnswer {...props} />

    default:
      return null
  }
}

export default SurveyQuestionAnswer
