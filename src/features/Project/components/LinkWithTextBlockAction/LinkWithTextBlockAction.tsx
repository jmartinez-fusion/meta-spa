import React from 'react'
import { type LinkWithTextBlockActionProps } from 'Project/components/LinkWithTextBlockAction/types'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LinkWithTextBlockAction: React.FC<LinkWithTextBlockActionProps> = ({
  onLinkWithTextBlock,
}) => {
  const { t } = useTranslation('common')

  if (!onLinkWithTextBlock) {
    return null
  }

  return (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      onClick={onLinkWithTextBlock}
      sx={{
        borderRadius: '10px !important',
        minHeight: '28px !important',
        height: '28px !important',
        maxHeight: '28px !important',
        minWidth: 'unset !important',
      }}
    >
      {t('linkWithTextBlock')}{' '}
    </Button>
  )
}

export default LinkWithTextBlockAction
