import React from 'react'
import { FormHelperText, InputLabel } from '@mui/material'
import c from 'classnames'
import { EditorProvider } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { type RichTextEditorProps } from 'components/RichTextEditor/types'
import RichTextEditorToolbar from './components/RichTextEditorToolbar'
import styles from './richTextEditor.module.scss'

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  placeholder,
  onChange,
  error,
  helperText,
  disabled = false,
  value,
}) => {
  const [open, setOpen] = React.useState(false)
  const [timer, setTimer] = React.useState<never | null>(null)

  const extensions = [StarterKit, Placeholder.configure({ placeholder }), Underline]

  const handleFocus = (): void => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    setOpen(true)
  }

  const handleBlur = (): void => {
    setTimer(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setTimeout(() => {
        setOpen(false)
      }, 250)
    )
  }

  const handleUpdate = (ed: any): void => {
    onChange(ed.editor.getHTML())
  }

  return (
    <div className={c(styles.richTextEditor, error && styles.error)}>
      {label && <InputLabel>{label}</InputLabel>}
      {disabled ? (
        <div
          className={c(styles.input, styles.disabledInput)}
          dangerouslySetInnerHTML={{ __html: value ?? '' }}
        />
      ) : (
        <EditorProvider
          content={value}
          slotBefore={open && <RichTextEditorToolbar />}
          extensions={extensions}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onUpdate={handleUpdate}
        >
          <></>
        </EditorProvider>
      )}
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  )
}
export default RichTextEditor
