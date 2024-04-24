import { type ReactNode } from 'react'
import { type UseUploadEntitiesResult } from 'hooks/useLoadEntities.tsx'

export interface UploadEntitiesProps {
  title: string
  children?: ReactNode
  handleClose: () => void
  useUploadEntities: UseUploadEntitiesResult
}
