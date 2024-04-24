import * as Yup from 'yup'

const SurveysFormSchema = Yup.object({
  deliveredAt: Yup.string().max(255).required('validations:required'),
  closedAt: Yup.string().max(255).required('validations:required'),
  departments: Yup.array().required('validations:required').min(1, 'validations:required'),
  segmentation: Yup.string().max(255).required('validations:requiredWithField'),
})

export default SurveysFormSchema
