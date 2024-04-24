import { lazy } from 'react'
import loadable from 'components/Loadable'

// project imports

export const PATHS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  FORGOT_PASSWORD: 'forgot-password',
  VALIDATE_SESSION: 'validate-session',
  TWO_FACTOR_AUTHENTICATION: 'two-factor',
  RESET_PASSWORD: 'new-password',
}

// auth routing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Login = loadable(lazy(async () => await import('./screens/SignIn/SignIn.tsx')))
const Logout = loadable(lazy(async () => await import('./screens/Logout.tsx')))
const ForgotPassword = loadable(
  lazy(async () => await import('./screens/ForgotPassword/ForgotPassword'))
)
const ValidateSession = loadable(lazy(async () => await import('./screens/ValidateSession')))

const ResetPassword = loadable(lazy(async () => await import('./screens/ChangePassword')))

export const AuthPublicRoutes = [
  { path: PATHS.LOGIN, element: <Login /> },
  { path: PATHS.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: PATHS.VALIDATE_SESSION, element: <ValidateSession /> },
  {
    path: PATHS.TWO_FACTOR_AUTHENTICATION,
    element: (
      <ValidateSession
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        loginAfterValidate={true}
        goBackPath={`/auth/${PATHS.LOGIN}`}
        nextPath={'/administration'}
      />
    ),
  },
  { path: PATHS.RESET_PASSWORD, element: <ResetPassword /> },
]

export const AuthPrivateRoutes = [{ path: PATHS.LOGOUT, element: <Logout /> }]
