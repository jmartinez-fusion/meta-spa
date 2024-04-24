import { type FC } from 'react'
import { Chip } from '@mui/material'
import { type StateChipVariants } from './types'
import { useTranslation } from 'react-i18next'

const CurrentProcessChipStatus: FC<{
  status?: string
}> = ({ status }) => {
  const { t } = useTranslation('features', { keyPrefix: 'CurrentProcesses' })

  const toCamelCase = (input: string): string =>
    input
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '')

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

export default CurrentProcessChipStatus
