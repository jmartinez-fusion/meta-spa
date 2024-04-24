import * as Yup from 'yup'

const RoleEditionSchema = Yup.object({
  name: Yup.string().required('role.required'),
})

export default RoleEditionSchema
