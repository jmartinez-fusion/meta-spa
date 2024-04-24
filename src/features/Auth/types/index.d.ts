export type UserType = 'MetaUser' | 'ClientUser'
export interface AuthUserType {
  id: string | null
  email: string
  name: string
  isAdmin: boolean
  role: string
  type: UserType
  active: boolean
}

export interface PermissionType {
  id: string
  name: string
  label: string
}

export interface PermissionFromAPIType {
  id: string
  name: string
  label: string
}

export interface SessionFromBrowserType {
  accessToken: string
  refreshToken: string
  user: AuthUserFromBrowserType
}

export interface SessionFromAPIType {
  accessToken: string
  refreshToken?: string
  data?: AuthUserFromAPIType
}

export interface MetaDataFromAPIType {
  projectId?: string
  surveyId?: string
  userEmail?: string
}

export interface ResetPasswordSession {
  token: string
}

export type AuthUserAsJsonType = AuthUserType
export interface AuthUserFromAPIType {
  id?: string | null
  email?: string
  fullName?: string
  role?: string
  type?: UserType
  isAdmin?: boolean
  active?: boolean
  permissions?: PermissionFromAPIType[]
}

export interface AuthUserFromBrowserType {
  id?: string | null
  email?: string
  name?: string
  type?: UserType
  isAdmin?: boolean
  role?: string
  active?: boolean
  permissions?: PermissionFromAPIType[]
}
