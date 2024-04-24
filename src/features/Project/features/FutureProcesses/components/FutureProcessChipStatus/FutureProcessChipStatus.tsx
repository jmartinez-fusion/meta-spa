import { type FC } from 'react'
import { Chip } from '@mui/material'
import { type StateChipVariants } from './types'
import { useTranslation } from 'react-i18next'
import { toCamelCase } from 'utils/utils'

const FutureProcessChipStatus: FC<{
  status?: string
}> = ({ status }) => {
  const { t } = useTranslation('features', { keyPrefix: 'FutureProcesses' })

  const getStateChipVariant = (status: string): StateChipVariants => {
    const variantMapping: Record<string, StateChipVariants> = {
      notStarted: 'warning',
      inProcess: 'secondary',
      routeForReview: 'warning',
      returned: 'primary',
      approved: 'success',
    }

    return variantMapping[status] || 'default'
  }

  return (
    <Chip
      label={t(`status.${toCamelCase(status ?? '')}`)}
      sx={{ maxWidth: '150px' }}
      color={getStateChipVariant(toCamelCase(status ?? ''))}
    />
  )
}

export default FutureProcessChipStatus
