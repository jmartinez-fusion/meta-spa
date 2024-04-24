import React from 'react'
import { type QuestionFormProps } from 'Project/features/Surveys/components/SurveyForm/QuestionForm/types'
import DropdownQuestionForm from 'Project/features/Surveys/components/SurveyForm/QuestionForm/components/DropdownQuestionForm'

const QuestionForm: React.FC<QuestionFormProps> = ({
  type,
  getFieldProps,
  setFieldValue,
  initialValues,
}) => {
  switch (type) {
    case 'dropdown':
      return (
        <DropdownQuestionForm
          type="dropdown"
          initialValues={initialValues}
          getFieldProps={getFieldProps}
          setFieldValue={setFieldValue}
        />
      )

    default:
      return null
  }
}

export default QuestionForm
