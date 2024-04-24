import * as Yup from 'yup'

const ProjectEditionSchema = Yup.object({
  client: Yup.string().max(255).required('fields.client.validationRequired'),
  industry: Yup.string().required('fields.industries.validationRequired'),
  licenseInformation: Yup.string().required('fields.licenseInformation.validationRequired'),
  startDateFrom: Yup.string().required('fields.startDateFrom.validationRequired'),
  startDateTo: Yup.string().required('fields.startDateTo.validationRequired'),
  name: Yup.string().max(255).required('fields.name.validationRequired'),
  logo: Yup.mixed().required('fields.logo.validationRequired'),
})

export default ProjectEditionSchema
