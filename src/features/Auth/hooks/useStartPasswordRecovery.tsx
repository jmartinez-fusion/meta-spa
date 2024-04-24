import config from 'src/config.tsx'
import useFetch, { type RequestError } from 'src/hooks/useFetch'

interface StartPasswordRecoveryProps {
  startRecovery: (email: string) => Promise<void>
  loading: boolean
  error: RequestError
}

export default function useStartPasswordRecovery(): StartPasswordRecoveryProps {
  const { doFetch, error, loading } = useFetch(
    `${config.api.msAuth.baseUrl}/auth/forgot-password`,
    {
      method: 'POST',
    }
  )

  const startRecovery = async (email: string): Promise<void> => {
    try {
      const data = { email, platform: config.api.platform }
      await doFetch({ data })
    } catch (err) {
      await Promise.reject(err)
    }
  }

  return { startRecovery, loading, error }
}
