import * as Yup from 'yup'

const RoleFilterSchema = Yup.object({
  name: Yup.string(),
})

export default RoleFilterSchema
