import { type PermissionFromAPIType } from '../types'

class Permission {
  id: string
  name: string
  label: string

  constructor(id: string, name: string, label: string) {
    this.id = id
    this.name = name
    this.label = label
  }

  static fromAPI({ id, name, label }: PermissionFromAPIType): Permission {
    return new Permission(id, name, label)
  }
}

export default Permission
