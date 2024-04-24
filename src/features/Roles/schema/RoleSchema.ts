import * as Yup from 'yup'

const RoleSchema = Yup.object({
  name: Yup.string().required('role.required'),
})

export default RoleSchema
