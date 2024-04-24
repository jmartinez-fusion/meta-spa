import { type FC } from 'react'
import { Stack, Typography } from '@mui/material'
import img404 from 'src/assets/errors/error-404.png'
import { useTranslation } from 'react-i18next'

const NoResults: FC = () => {
  const { t } = useTranslation()
  return (
    <Stack m={3} spacing={3} sx={{ alignItems: { sm: 'center' } }}>
      <img
        alt="no results"
        src={img404}
        style={{
          width: 120,
        }}
      />
      <Typography color="text.secondary">{t('common:noResults')}</Typography>
    </Stack>
  )
}

export default NoResults
