import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type UploadErrorRow } from 'types/uploadEntities'
import { type UploadErrorProps } from 'components/UploadingEntities/components/UploadErrors/types'
import styles from './uploadErrors.module.scss'
import { IconButton } from '@mui/material'
import { ContentCopyOutlined } from '@mui/icons-material'

const UploadError: FC<UploadErrorProps> = ({ useUploadEntities }) => {
  const { t } = useTranslation('common')
  const { error, file } = useUploadEntities

  const handleCopyToClipboard = useCallback(() => {
    let text = ''

    if (typeof error === 'string') {
      text = error
    } else {
      error?.message.forEach((errorRow: UploadErrorRow) => {
        if (!(errorRow.errors.length === 0)) {
          errorRow?.errors?.forEach((error) => {
            text += `${t('row', { row: errorRow.row })}  ${error}\n`
          })
        }
      })
    }

    void navigator.clipboard.writeText(text)
  }, [error, t])

  return (
    <div className={styles.errorContainer}>
      <div className={styles.headerContainer}>
        {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error */}
        <div>{file?.path}</div>
        <IconButton
          color="secondary"
          aria-label="hide"
          size="small"
          title={t('copyToClipboard')}
          onClick={handleCopyToClipboard}
        >
          <ContentCopyOutlined sx={{ fontSize: 14 }} />
        </IconButton>
      </div>
      {typeof error === 'string' ? (
        <div>{error}</div>
      ) : (
        error?.message?.map((errorRow: UploadErrorRow) => {
          if (errorRow.errors.length === 0) {
            return null
          }
          return (
            <div key={`error_row_${errorRow.row}`} className={styles.errorContainer}>
              {errorRow?.errors?.map((error) => (
                <div className={styles.error} key={error + errorRow.row}>
                  <div className={styles.row}>{t('row', { row: errorRow.row })}</div>
                  <div>{error}</div>
                </div>
              ))}
            </div>
          )
        })
      )}
      <></>
    </div>
  )
}

export default UploadError
