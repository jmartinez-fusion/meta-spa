import { type FC, startTransition, useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import LoadingRing from 'components/LoadingRing'

const Logout: FC = () => {
  const initialized = useRef(false)
  const { logout } = useAuth()

  const initialize = async (): Promise<void> => {
    if (initialized.current) return
    initialized.current = true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    startTransition(async () => await logout())
  }

  useEffect(() => {
    void initialize()
  }, [])

  return <LoadingRing center small />
}

export default Logout
