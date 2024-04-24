import * as Yup from 'yup'

const SprintSchema = Yup.object({
  name: Yup.string().max(255).required('validations:required'),
  code: Yup.string().max(255).required('validations:required'),
  startDate: Yup.date().required('validations:required'),
  dueDate: Yup.date().required('validations:required'),
})

export default SprintSchema
