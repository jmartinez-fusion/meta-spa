import * as Yup from 'yup'

const SurveyDropdownQuestionFormSchema = Yup.object({
  response: Yup.string().max(255).required('validations:required'),
})

export default SurveyDropdownQuestionFormSchema
