import { lazy } from 'react'

// project imports

// dashboard routing
const SignedUrlValidation = lazy(
  async () => await import('features/SignedUrlValidation/screens/SignedUrlValidation')
)

const SignedUrlValidationRoutes = {
  path: '/signed-urls',
  element: <SignedUrlValidation />,
}

export default SignedUrlValidationRoutes
