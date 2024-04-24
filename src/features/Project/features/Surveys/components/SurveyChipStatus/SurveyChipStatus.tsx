import { type FC } from 'react'
import { Chip } from '@mui/material'
import { type StateChipVariants } from './types'
import { useTranslation } from 'react-i18next'

const SurveyChipStatus: FC<{
  status?: string
}> = ({ status }) => {
  const { t } = useTranslation('features', { keyPrefix: 'Surveys' })

  const getStateChipVariant = (status: string): StateChipVariants => {
    const variantMapping: Record<string, StateChipVariants> = {
      pending: 'warning',
      closed: 'secondary',
      paused: 'default',
      open: 'success',
    }

    return variantMapping[status] || 'default'
  }

  return (
    <Chip
      label={t(`statuses.${status ?? ''}`)}
      sx={{ maxWidth: '150px' }}
      color={getStateChipVariant(status ?? '')}
    />
  )
}

export default SurveyChipStatus
