import * as Yup from 'yup'
import { validateHTMLContent } from 'utils/validateHtmlContent.ts'

const BasicQuestionSchema = Yup.object({
  title: Yup.string().max(255).required('validations:required'),
  description: Yup.string()
    .max(255)
    .required('validations:required')
    .test('html-content', 'validations:required', validateHTMLContent),
  type: Yup.string().max(255).required('validations:required'),
})

// Esquema para preguntas de tipo "dropdown"
const DropdownQuestionSchema = Yup.object({
  title: Yup.string().max(255).required('validations:required'),
  description: Yup.string()
    .max(255)
    .required('validations:required')
    .test('html-content', 'validations:required', validateHTMLContent),
  type: Yup.string().max(255).required('validations:required'),
  options: Yup.array()
    .required('validations:requiredWithFieldPlural')
    .min(1, 'validations:requiredWithFieldPlural'),
})

const SurveysFormSchema = Yup.object({
  name: Yup.string().max(255).required('validations:required'),
  // sprintId: Yup.string().max(255).required('validations:required'),
  questions: Yup.array()
    .of(
      Yup.lazy((value) => {
        if (value.type === 'dropdown') {
          return DropdownQuestionSchema
        }
        return BasicQuestionSchema
      })
    )
    .required('validations:requiredWithFieldPlural')
    .min(1, 'validations:requiredWithFieldPlural'),
})

export default SurveysFormSchema
