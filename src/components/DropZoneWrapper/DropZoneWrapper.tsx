import React, { type FunctionComponent, useCallback } from 'react'
import { useDropzone, type DropzoneOptions } from 'react-dropzone'

interface PresentationDropZoneProps {
  acceptedFiles: string[]
  onChange: (acceptedFiles: File[]) => void
  Component?: FunctionComponent<any>
  [x: string]: any
}

const DropZoneWrapper: React.FC<PresentationDropZoneProps> = ({
  acceptedFiles,
  onChange,
  Component = 'div',
  ...props
}) => {
  const hasComponent = Component !== 'div'
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onChange) {
        onChange(acceptedFiles)
      }
    },
    [onChange]
  )

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    accept: acceptedFiles.join(','),
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)

  return (
    <>
      <Component
        {...getRootProps()}
        onClick={hasComponent ? getRootProps().onClick : () => null}
        style={
          !hasComponent
            ? {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                position: 'fixed',
                right: 0,
                top: 0,
                backgroundColor: 'transparent',
                outline: 'none',
                zIndex: 1111,
              }
            : undefined
        }
        isDragActive={isDragActive}
        {...props}
      >
        <input {...getInputProps()} />
      </Component>
    </>
  )
}

export default DropZoneWrapper
