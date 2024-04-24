import * as Yup from 'yup'

const ClientUserFilterSchema = Yup.object({
  email: Yup.string().email('fields.email.validationInvalid').max(255),
})

export default ClientUserFilterSchema
