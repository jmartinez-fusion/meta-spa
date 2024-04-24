import { type Category } from 'features/Categories/types'
import { type Tag } from 'Project/features/TextBlocks/types'

export interface TextBlocksFiltersProps {
  onCancel: () => void
  onApply: (data: any) => void
  showBottomFilters?: boolean
  initialFilters?: {
    question?: string
    tags?: string | Tag[]
    categories?: string | Category[]
    createdAtFrom?: string | null
    createdAtTo?: string | null
    updatedAtFrom?: string | null
    updatedAtTo?: string | null
  }
}
