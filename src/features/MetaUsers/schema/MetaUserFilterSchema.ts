import * as Yup from 'yup'

const MetaUserFilterSchema = Yup.object({
  email: Yup.string().email('fields.email.validationInvalid').max(255),
})

export default MetaUserFilterSchema
