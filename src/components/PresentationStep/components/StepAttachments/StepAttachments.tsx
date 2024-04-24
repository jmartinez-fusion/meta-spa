import React from 'react'
import PDF from './assets/PDF.svg'
import XLS from './assets/XLS.svg'
import Image from './assets/Image.svg'
import DOC from './assets/DOC.svg'
import { type StepAttachmentsProps } from 'components/PresentationStep/components/StepAttachments/types'
import { type File } from 'types/file'
import { InsertDriveFileOutlined } from '@mui/icons-material'
import { SvgIcon, Typography } from '@mui/material'
import styles from './stepAttachments.module.scss'
import { useTranslation } from 'react-i18next'

const StepAttachments: React.FC<StepAttachmentsProps> = ({ attachments }) => {
  const { t } = useTranslation()
  const getIcon = (extension: string): any => {
    const iconMap: Record<string, any> = {
      png: Image,
      jpg: Image,
      jpeg: Image,
      gif: Image,
      pdf: PDF,
      xls: XLS,
      xlsx: XLS,
      doc: DOC,
      docx: DOC,
      default: <InsertDriveFileOutlined />,
    }

    return iconMap[extension] ? (
      <img alt="type" src={iconMap[extension]} className={styles.type} />
    ) : (
      <SvgIcon fontSize="inherit">{iconMap.default}</SvgIcon>
    )
  }

  if (!attachments || attachments.length === 0) {
    return null
  }

  return (
    <div className={styles.mainContainer}>
      <Typography variant="h3">{t('attachments')}</Typography>
      <div className={styles.attachments}>
        {attachments.map((file: File) => (
          <div key={file.id} className={styles.attachment}>
            <div className={styles.type}>{getIcon(file.type)}</div>
            <a href={file.url} download={file.name} className={styles.fileName}>
              {file.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepAttachments
