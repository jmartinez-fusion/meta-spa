import { useContext } from 'react'
import { type CapturingToolType } from '../contexts/CapturingToolProvider.tsx'
import CapturingToolContext from '../contexts/CapturingToolContext.ts'

const useCapturingTool = (): CapturingToolType => useContext(CapturingToolContext)

export default useCapturingTool
