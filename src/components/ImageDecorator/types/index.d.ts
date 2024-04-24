import { type Image } from 'Project/features/PresentationTool/types'

export interface ImageDecoratorProps {
  image?: Image
  initialData: {
    elements: any[]
    comments: any
  }
  readOnly?: boolean
  onElementsChange: Function
  canLinkWithTextBlocks?: boolean
  onTextBlockElementSelection?: (element: any) => void
}
