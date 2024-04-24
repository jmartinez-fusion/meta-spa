import { type FC } from 'react'
import { Chip } from '@mui/material'
import { type StateChipVariants } from './types'
import { toCamelCase } from 'utils/utils'
import { useTranslation } from 'react-i18next'

const ProcessMappingChipStatus: FC<{
  status?: string | null
}> = ({ status }) => {
  const { t } = useTranslation('features', { keyPrefix: 'ProcessMapping' })

  const getStateChipVariant = (status: string): StateChipVariants => {
    const variantMapping: Record<string, StateChipVariants> = {
      notStarted: 'warning',
      inProcess: 'secondary',
      routeForReview: 'warning',
      returned: 'primary',
      approved: 'success',
      directlyMapped: 'primary',
    }

    return variantMapping[status] || 'default'
  }

  const effectiveStatus = !status || status.length === 0 ? 'notMapped' : status

  return (
    <Chip
      label={t(`status.${toCamelCase(effectiveStatus)}`)}
      title={t(`status.${toCamelCase(effectiveStatus)}`)}
      sx={{ maxWidth: '150px' }}
      color={getStateChipVariant(toCamelCase(effectiveStatus))}
    />
  )
}

export default ProcessMappingChipStatus
