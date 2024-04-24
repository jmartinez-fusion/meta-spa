export interface ImageDecoratorToolbarProps {
  handleSelectionClick?: () => void
  handleRectangleClick?: () => void
  handleHighlightClick?: () => void
  handleBlurClick?: () => void
  handleCommentClick?: () => void
  handleTextBlockSelectionClick?: () => void
  isSelectionToolActive?: boolean
  isRectangleToolActive?: boolean
  isHighlightToolActive?: boolean
  isBlurToolActive?: boolean
  isCommentToolActive?: boolean
  isTextBlockSelectionToolActive?: boolean
  readOnly?: boolean
  canLinkWithTextBlocks?: boolean
}
