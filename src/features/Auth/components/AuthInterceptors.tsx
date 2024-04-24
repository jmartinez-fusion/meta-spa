import { type ReactNode, type FC } from 'react'
import axios, { type AxiosError } from 'axios'
import useAuth from '../hooks/useAuth'

interface AuthInterceptorsProps {
  children: ReactNode
}

const AuthInterceptors: FC<AuthInterceptorsProps> = ({ children }) => {
  const { logout } = useAuth()

  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        void logout(false)
      }

      return await Promise.reject(error)
    }
  )

  return <>{children}</>
}

export default AuthInterceptors
