import React, { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CLIENT_DEFAULT_PERMISSIONS, CLIENT_USERS_DEFAULT } from 'permissions'
import useLoginFetch from 'features/Auth/hooks/useLoginFetch'
import useLogoutFetch from 'features/Auth/hooks/useLogoutFetch'
import useBrowserSession from 'features/Auth/hooks/useBrowserSession'
import useBrowserStorage from 'hooks/useBrowserStorage.ts'
import useSessionUserFetch from 'features/Auth/hooks/useSessionUserFetch'
import AuthInterceptors from 'features/Auth/components/AuthInterceptors'
import type Session from 'features/Auth/models/Session'
import type AuthUser from 'features/Auth/models/AuthUser'
import useLoginWithSignatureFetch from 'features/Auth/hooks/useLoginWithSignatureFetch'
import AuthContext from './AuthContext'
import { PATHS } from 'features/Auth/routes.tsx'

export interface AuthProviderType {
  isAuthenticated: boolean
  isLoading: boolean
  session: Session | null
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> | ((value: any) => void)
  login: (email: string, password: string) => Promise<any>
  initSession: (session: Session | null) => void
  logout: (doRevokeToken: boolean) => Promise<any>
  checkPermissions: (permissionsToVerify: string | string[], orValidation?: boolean) => boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { activeSession, persistSession, clearSession } = useBrowserSession()
  const { doLogin } = useLoginFetch()
  const { doLogin: doLoginWithSignature } = useLoginWithSignatureFetch()
  const { doLogout } = useLogoutFetch()
  const [searchParams] = useSearchParams()
  const metadataSignature = useBrowserStorage('metaData')
  const signature = searchParams.get('signature')
  const [session, setSession] = useState<Session | null>(null)
  const { getSessionUser, isLoadingSessionUser } = useSessionUserFetch()
  const [isLoading, setIsLoading] = useState(true)
  const initialized = useRef(false)
  const navigate = useNavigate()

  const hasPermission = (permission: string): boolean =>
    permission === 'yes' ||
    !!session?.user?.permissions.some((userPermission) => userPermission.name === permission) ||
    (!!session?.user?.permissions.some(
      (userPermission) => userPermission.name === CLIENT_USERS_DEFAULT
    ) &&
      CLIENT_DEFAULT_PERMISSIONS.includes(permission))

  const checkPermissions = (
    permissionsToVerify: string | string[] = [],
    orValidation = false
  ): boolean => {
    if (permissionsToVerify === 'yes' || session?.user?.isAdmin) {
      return true
    }

    const permissions: string[] = Array.isArray(permissionsToVerify)
      ? permissionsToVerify
      : [permissionsToVerify]

    if (orValidation) {
      return permissions.some((permission) => hasPermission(permission))
    }

    return permissions.every((permission) => hasPermission(permission))
  }

  const updateUser = (session: Session, authUser: AuthUser): void => {
    if (session) {
      session.updateUser(authUser)
      persistSession(session)
    }
  }

  const initSession = (session: Session | null): void => {
    if (session) {
      persistSession(session)
      setIsAuthenticated(true)
      setSession(session)
      setIsLoading(false)

      if (!session.user.isFull) {
        void getSessionUser().then((user: AuthUser) => {
          updateUser(session, user)
        })
      }
    }
  }

  const validateSignature = useCallback(
    async (signature: string): Promise<Session | null> => {
      try {
        return await doLoginWithSignature(signature)
      } catch (err) {
        navigate('/410')
        setIsLoading(false)
      }
      return null
    },
    [doLogin, navigate]
  )

  const initialize = async (): Promise<void> => {
    if (initialized.current) return
    initialized.current = true
    if (activeSession() ?? signature) {
      let currentSession = null
      if (signature) {
        metadataSignature.clear()
        currentSession = await validateSignature(window.location.href)
      } else {
        currentSession = activeSession()
      }
      initSession(currentSession)
    } else {
      setIsLoading(false)
    }
  }

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await doLogin(email, password)
        navigate(`/auth/${PATHS.TWO_FACTOR_AUTHENTICATION}?email=${encodeURIComponent(email)}`)
      } catch (err) {
        return await Promise.reject(err)
      }
    },
    [doLogin, navigate]
  )

  const logout = useCallback(
    async (doRevokeToken = true) => {
      try {
        if (doRevokeToken) {
          await doLogout()
        }

        setSession(null)
        clearSession()
        setIsAuthenticated(false)

        navigate('/auth/login')

        setIsLoading(false)
        await Promise.resolve()
      } catch (e) {
        return await Promise.reject(e)
      }
    },
    [doLogout, navigate, clearSession]
  )

  useEffect((): void => {
    void initialize()
  }, [])

  return (
    // Using the provider so that ANY component in our application can
    // use the values that we are sending.
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading: isLoading || isLoadingSessionUser,
        session,
        setIsAuthenticated,
        checkPermissions,
        login,
        initSession,
        logout,
      }}
    >
      <AuthInterceptors>{children}</AuthInterceptors>
    </AuthContext.Provider>
  )
}

export default AuthProvider
