import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { type LinkingCardTextBlockProps } from './types'
import { Button, Tooltip } from '@mui/material'
import { Lock, ShieldOutlined } from '@mui/icons-material'
import styles from './linkingCardTextBlock.module.scss'

const LinkingCardTextBlock: FC<LinkingCardTextBlockProps> = ({ textBlock, onSelect }) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.title}>{textBlock.title}</div>
        {textBlock.isGlobal && (
          <Tooltip title={t('listing.isGlobal')}>
            <div className={styles.cardGlobal}>
              <Lock className={styles.iconLock} sx={{ fontSize: 10 }} />
              <ShieldOutlined sx={{ fontSize: 28 }} />
            </div>
          </Tooltip>
        )}
      </div>
      <div className={styles.cardContent}>
        <div
          className={styles.cardDescription}
          dangerouslySetInnerHTML={{ __html: textBlock.description }}
        />
        <Button
          fullWidth
          size="small"
          variant="outlined"
          onClick={onSelect}
          sx={{
            borderRadius: '10px !important',
            minHeight: '28px !important',
            height: '28px !important',
            maxHeight: '28px !important',
          }}
        >
          {t('select')}
        </Button>
      </div>
    </div>
  )
}

export default LinkingCardTextBlock
