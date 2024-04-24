import { createContext } from 'react'
import { type CapturingToolType } from './CapturingToolProvider.tsx'

const CapturingToolContext = createContext<CapturingToolType>({
  isInstalled: false,
})

export default CapturingToolContext
