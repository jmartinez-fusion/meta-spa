import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext.ts'
import { type AuthProviderType } from '../contexts/AuthProvider.tsx'

const useAuth = (): AuthProviderType => useContext(AuthContext)

export default useAuth
