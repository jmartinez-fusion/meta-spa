import { type ReactNode } from 'react'
import { type ProcessModule } from 'types/processModule'

export interface CaptureExtensionProps {
  children: ReactNode
  module: ProcessModule
  processId: string
  redirect?: string
}
