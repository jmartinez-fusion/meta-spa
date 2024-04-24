import * as Yup from 'yup'

const CurrentProcessSchema = Yup.object({
  name: Yup.string().max(255).required('fields.name.validationRequired'),
  associatedSPCs: Yup.object().required('fields.associatedSPCs.validationRequired'),
})

export default CurrentProcessSchema
