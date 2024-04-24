import { type ReactNode, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useAuth from 'src/features/Auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const AuthPreLoaders = ({ children }: any): ReactNode | null => {
  const { isAuthenticated, session, isLoading } = useAuth()
  const { user } = session ?? {}
  const ignore = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return
    }

    if (!isLoading && !isAuthenticated) {
      navigate('/auth/login')
    }

    ignore.current = true
  }, [isAuthenticated, user, isLoading])

  if (!isLoading && !isAuthenticated) {
    navigate('/auth/login')
  }

  if (isLoading || !isAuthenticated) {
    return null
  }

  return children
}

AuthPreLoaders.propTypes = {
  children: PropTypes.node,
}

export default AuthPreLoaders
