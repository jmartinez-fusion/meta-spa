export interface CommentModalProps {
  onClose: () => void
  readOnly?: boolean
  element: any
  onDelete: () => void
  onConfirm: (comment: string) => void
}
