import c from 'classnames'
import { Button, FormHelperText, Typography } from '@mui/material'
import type { Accept, FileRejection } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useState, useCallback, useEffect, useMemo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import mime from 'mime'
import styles from './DropZone.module.scss'
// import blobToBase64 from 'src/utils/blobToBase64'

interface DropZoneProps {
  acceptedFileExtensions: string[]
  name: string
  label: string
  onChange: (files: File | FileRejection | null | string) => void
  onError: (error: string | string[]) => void
  maxFiles?: number
  multiple?: boolean
  mode?: string
  logoDefault?: string | File | null
  initialValue?: FileRejection | FileRejection[] | string
  error?: boolean | string | string[] | null
  recommendedSize?: {
    min: number
    max: number
  } | null
}

const DropZone: FC<DropZoneProps> = ({
  acceptedFileExtensions,
  name,
  label,
  onChange,
  onError,
  maxFiles,
  multiple,
  mode,
  logoDefault,
  initialValue,
  error,
  recommendedSize,
}) => {
  const { t } = useTranslation('dropzone')
  const [hasChanged, setHasChanged] = useState(false)
  // const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [fileSizes, setFileSizes] = useState<number[]>([])
  const [files, setFiles] = useState<File[]>(
    Array.isArray(initialValue) ? initialValue.map((fileRejection) => fileRejection.file) : []
  )
  const isFiles = files?.length < (maxFiles ?? Infinity)
  const acceptedFiles = useMemo(() => {
    const acceptedFiles: Accept = {}

    acceptedFileExtensions.forEach((extension) => {
      const type = mime.getType(extension)

      if (type) {
        acceptedFiles[type] = []
      } else {
        throw new Error(`Invalid file extension: "${extension}"`)
      }
    })

    return acceptedFiles
  }, [acceptedFileExtensions])

  useEffect(() => {
    if (initialValue) {
      const initialFiles = Array.isArray(initialValue)
        ? initialValue.map((fileRejection) => fileRejection.file)
        : [typeof initialValue === 'string' ? initialValue : initialValue?.file]

      setFiles(initialFiles.filter((file) => file instanceof File) as File[])
      setHasChanged(true)
    }
  }, [initialValue])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (multiple) {
        setFiles([...files, ...acceptedFiles])
      } else {
        setFiles(acceptedFiles)
      }
      const sizesInKB = acceptedFiles.map((file) => Math.round(file.size / 1024))
      setFileSizes([...fileSizes, ...sizesInKB])
      // void blobToBase64(acceptedFiles[0]).then((base64Img) => {
      //   setPreviewImage(base64Img)
      // })
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onloadend = () => {
        onChange(reader.result as string)
      }

      setHasChanged(true)
    },
    [files, multiple]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    multiple,
    maxFiles,
    accept: acceptedFiles,
  })

  useEffect(() => {
    if (!fileRejections || fileRejections?.length === 0) return
    onError(`validations:${fileRejections[0].errors[0].code}`)
  }, [fileRejections, multiple])

  useEffect(() => {
    if (!hasChanged) return
    onChange(files[0] || null)
  }, [JSON.stringify(files), multiple])

  return (
    <div className={styles.dropZoneContainer}>
      <div className={styles.dropZone}>
        <div className={styles.boxRow}>
          <Typography variant="caption" textAlign="left">
            {label}
          </Typography>
        </div>
        {mode !== 'view' && (
          <>
            <input {...getInputProps({ name })} />
            <div className={styles.boxRow}>
              <div {...getRootProps()} className={styles.boxBtn}>
                <Button variant="contained" color="secondary">
                  {t('chooseFile')}
                </Button>
                <p className={styles.textHelpSize}>
                  {t('recommendedSize', { ...recommendedSize })}
                </p>
              </div>
              <div
                {...getRootProps()}
                className={c(styles.boxFile, isDragActive && styles.boxFileDragActive)}
              >
                {isFiles && (
                  <>
                    <CloudUploadIcon height={48} width={46} />
                    <Typography variant="body2">{t('dragAndDrop')}</Typography>
                  </>
                )}
                {!isFiles && (
                  <>
                    {files.map((file, index) => (
                      <div className={styles.boxItemFile} key={file.size}>
                        <div className={styles.boxInfoFile}>
                          <div className={styles.boxIcoFile}>
                            <ImageOutlinedIcon height={48} width={46} />
                          </div>
                          <div className={styles.boxNameFile}>
                            <Typography
                              variant="caption"
                              sx={{
                                width: {
                                  xs: '16ch',
                                  sm: '24ch',
                                },
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {file.name}
                            </Typography>
                            <p className={styles.sizeFile}>{fileSizes[index]}KB</p>
                          </div>
                        </div>
                        <div className={styles.boxPreviewFile}>
                          {logoDefault && (
                            <img
                              src={
                                logoDefault instanceof File
                                  ? URL.createObjectURL(logoDefault)
                                  : `data:image/png;base64,${
                                      logoDefault.startsWith('data:')
                                        ? logoDefault.split(',')[1]
                                        : logoDefault
                                    }`
                              }
                              alt="preview"
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {hasChanged && error && (
        <FormHelperText sx={{ mt: 1, mx: 3 }} error>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}

DropZone.defaultProps = {
  error: null,
  maxFiles: 0,
  multiple: false,
  initialValue: '',
  recommendedSize: null,
  onError: () => {},
}

export default DropZone
