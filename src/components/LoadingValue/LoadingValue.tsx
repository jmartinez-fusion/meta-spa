import { Skeleton, type SkeletonProps } from '@mui/material'
import { type ElementType, type FC } from 'react'

type SkeletonMuiProps = SkeletonProps

interface LoadingValueProps extends SkeletonMuiProps {
  loading: boolean
  value?: string | number | ElementType
  width?: number
  defaultValue?: string
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const LoadingValue: FC<LoadingValueProps> = (props) => {
  const { loading, width, value, defaultValue, ...skeletonProps } = props

  if (loading) return <Skeleton width={width} {...skeletonProps} />

  return value ?? defaultValue
}

export default LoadingValue
