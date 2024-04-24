import * as Yup from 'yup'

const ProjectConfigurationsSchema = Yup.object({
  host: Yup.string().required('validations:required'),
  port: Yup.string().required('validations:required'),
  protocol: Yup.string().required('validations:required'),
  username: Yup.string().required('validations:required'),
  senderName: Yup.string().required('validations:required'),
  senderEmailAddress: Yup.string()
    .email('validations:formatEmail')
    .max(255)
    .required('validations:required'),
  password: Yup.string().required('validations:required'),
})

export default ProjectConfigurationsSchema
