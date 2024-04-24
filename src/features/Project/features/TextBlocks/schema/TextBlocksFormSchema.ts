import * as Yup from 'yup'

const TextBlocksFormSchema = Yup.object({
  title: Yup.string().required('form.errors.title'),
  description: Yup.string().required('forms.errors.description'),
})

export default TextBlocksFormSchema
