import * as Yup from 'yup'

const MetaUserSchema = Yup.object({
  name: Yup.string().max(255).required('fields.name.validationRequired'),
  email: Yup.string()
    .email('fields.email.validationInvalid')
    .max(255)
    .required('fields.email.validationRequired'),
  roles: Yup.array().of(Yup.string().required('fields.roles.validationRequired')),
})

export default MetaUserSchema
