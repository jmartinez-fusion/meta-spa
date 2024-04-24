import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { type LinkedCardTextBlockProps } from './types'
import { Button, SvgIcon } from '@mui/material'
import styles from './linkedCardTextBlock.module.scss'
import { EditOutlined, LinkOutlined } from '@mui/icons-material'

const LinkedCardTextBlock: FC<LinkedCardTextBlockProps> = ({ textBlock, onSelect }) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.title}>{textBlock.title}</div>
      </div>
      <div className={styles.linkIcon}>
        <SvgIcon fontSize="inherit">
          <LinkOutlined />
        </SvgIcon>
      </div>
      <div className={styles.cardContent}>
        <div
          className={styles.cardDescription}
          dangerouslySetInnerHTML={{ __html: textBlock.description }}
        />
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onSelect}
          startIcon={
            <SvgIcon>
              <EditOutlined />
            </SvgIcon>
          }
          sx={{
            borderRadius: '10px !important',
            minHeight: '28px !important',
            height: '28px !important',
            width: '120px !important',
            minWidth: 'unset !important',
            maxHeight: '28px !important',
          }}
        >
          {t('common:edit')}
        </Button>
      </div>
    </div>
  )
}

export default LinkedCardTextBlock
