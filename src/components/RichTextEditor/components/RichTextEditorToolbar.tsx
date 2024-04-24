import React from 'react'
import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material'
import c from 'classnames'
import styles from './richTextEditorToolbar.module.scss'

import { useCurrentEditor } from '@tiptap/react'

const RichTextEditorToolbar: React.FC = () => {
  const { editor } = useCurrentEditor()
  if (!editor) {
    return null
  }

  return (
    <div className={styles.toolbar}>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          editor.chain().focus().toggleBold().run()
        }}
        className={c(editor.isActive('bold') && styles.markButtonActive)}
      >
        <FormatBold />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          editor.chain().focus().toggleItalic().run()
        }}
        className={c(editor.isActive('italic') && styles.markButtonActive)}
      >
        <FormatItalic />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          editor.chain().focus().toggleUnderline().run()
        }}
        className={c(editor.isActive('underline') && styles.markButtonActive)}
      >
        <FormatUnderlined />
      </button>
    </div>
  )
}

export default RichTextEditorToolbar
