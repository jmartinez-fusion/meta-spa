import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { type CardTextBlockProps } from './types'
import { Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import {
  ArticleOutlined,
  ContentCopyRounded,
  FileCopyOutlined,
  Lock,
  ModeEdit,
  ShareRounded,
  ShieldOutlined,
} from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import dateFormat from 'utils/dateFormat'
import ContentBox from 'components/ContentBox'
import useModal from 'hooks/useModal'
import useProject from 'Project/hooks/useProject'
import dateTimeFormat from 'utils/dateTimeFormat'
import { TEXT_BLOCKS_PATHS } from 'Project/features/TextBlocks/routes'
import styles from './cardTextBlock.module.scss'

const CardTextBlock: FC<CardTextBlockProps> = ({ textBlock }) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { project } = useProject()
  const navigate = useNavigate()
  const { Modal: ModalShare, close: closeShare, open, handleOpen } = useModal()
  const { enqueueSnackbar } = useSnackbar()

  const currentHost = `${window.location.protocol}//${window.location.host}`
  const urlDetails = TEXT_BLOCKS_PATHS.DETAILS.replace(':projectId', project?.id ?? '').replace(
    ':textBlockId',
    textBlock.id
  )

  const urlTextBlockDetails = `${currentHost}${urlDetails}`

  const message = t('copiedSuccessfully', {
    type: t('features:TexBlocks:singular'),
  })

  const navigateEdit = (): void => {
    navigate(
      TEXT_BLOCKS_PATHS.EDIT.replace(':projectId', project?.id ?? '').replace(
        ':textBlockId',
        textBlock.id
      )
    )
  }

  const navigateClone = (): void => {
    navigate(
      TEXT_BLOCKS_PATHS.CLONE.replace(':projectId', project?.id ?? '').replace(
        ':textBlockId',
        textBlock.id
      )
    )
  }

  const navigateView = (): void => {
    navigate(urlDetails)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.title}>{textBlock.title}</div>
        {textBlock.isGlobal && (
          <Tooltip title={t('listing.isGlobal')}>
            <div className={styles.cardGlobal}>
              <Lock className={styles.iconLock} sx={{ fontSize: 12 }} />
              <ShieldOutlined sx={{ fontSize: 34 }} />
            </div>
          </Tooltip>
        )}
      </div>
      <div className={styles.cardContent}>
        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: textBlock.description }} />}>
          <div
            className={styles.cardDescription}
            dangerouslySetInnerHTML={{ __html: textBlock.description }}
          />
        </Tooltip>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardColumn}>
          <p>
            <strong>{t('listing.created')}</strong>
          </p>
          <p>{textBlock.createdBy}</p>
          <p className={styles.date}>{dateFormat(textBlock.createdAt)}</p>
        </div>
        {textBlock.updatedBy && (
          <div className={styles.cardColumn}>
            <p>
              <strong>{t('listing.updated')}</strong>
            </p>
            <p>{textBlock.updatedBy}</p>
            <p className={styles.date}>{dateTimeFormat(textBlock.updatedAt)}</p>
          </div>
        )}
      </div>
      <div className={styles.cardFooter}>
        <Tooltip title={t('listing.edit')}>
          <IconButton color="secondary" aria-label="hide" size="small" onClick={navigateEdit}>
            <ModeEdit sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('listing.duplicate')}>
          <IconButton color="secondary" aria-label="hide" size="small" onClick={navigateClone}>
            <ContentCopyRounded sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('listing.share')}>
          <IconButton color="secondary" aria-label="hide" size="small" onClick={handleOpen}>
            <ShareRounded sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('listing.view')}>
          <IconButton color="secondary" aria-label="hide" size="small" onClick={navigateView}>
            <ArticleOutlined sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </div>
      <ModalShare open={open} onClose={closeShare}>
        <ContentBox isModal>
          <div className={styles.modalShare}>
            <h2>{t('listing.shareUrl')}</h2>
            <TextField
              value={urlTextBlockDetails}
              multiline
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={async () => {
                        closeShare()
                        await navigator.clipboard.writeText(urlTextBlockDetails)
                        enqueueSnackbar(message, {
                          preventDuplicate: false,
                          variant: 'success',
                        })
                      }}
                    >
                      <FileCopyOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button onClick={closeShare}>{t('listing.close')}</Button>
          </div>
        </ContentBox>
      </ModalShare>
    </div>
  )
}

export default CardTextBlock
