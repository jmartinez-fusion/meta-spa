import AuthUser from './AuthUser.tsx'
import {
  type AuthUserAsJsonType,
  type SessionFromAPIType,
  type SessionFromBrowserType,
} from '../types'

class Session {
  accessToken: string
  refreshToken: string
  user: AuthUser

  constructor(accessToken: string, refreshToken: string, user: AuthUser) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.user = user
  }

  get asJson(): { accessToken: string; user: AuthUserAsJsonType } {
    return {
      accessToken: this.accessToken,
      user: this.user.asJson,
    }
  }

  updateUser(user: AuthUser): void {
    this.user = user
  }

  static fromBrowser({
    accessToken = '',
    refreshToken = '',
    user,
  }: SessionFromBrowserType): Session {
    return new Session(accessToken, refreshToken, AuthUser.fromBrowser(user))
  }

  static fromAPI({ accessToken = '', refreshToken = '', data = {} }: SessionFromAPIType): Session {
    return new Session(accessToken, refreshToken, AuthUser.fromAPI(data))
  }
}

export default Session
