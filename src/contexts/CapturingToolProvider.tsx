import { type ReactNode, useEffect, useState } from 'react'
import CapturingToolContext from './CapturingToolContext.ts'

export interface CapturingToolType {
  isInstalled: boolean
}

interface CapturingToolProviderProps {
  children: ReactNode
}

const CapturingToolProvider = ({ children }: CapturingToolProviderProps): ReactNode => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false)

  useEffect(() => {
    const handleMessage = (event: any): void => {
      if (event.data.type === 'FROM_EXTENSION' && event.data.isInstalled) {
        setIsInstalled(true)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <CapturingToolContext.Provider
      value={{
        isInstalled,
      }}
    >
      {children}
    </CapturingToolContext.Provider>
  )
}

export default CapturingToolProvider
