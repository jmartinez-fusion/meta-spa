import { type FC } from 'react'
import useAuth from 'src/features/Auth/hooks/useAuth'
import { type GatedProps } from 'components/Gated/types'

const Gated: FC<GatedProps> = ({
  children,
  orValidation = false,
  permissions = 'yes',
  forbiddenElement = null,
}) => {
  const { checkPermissions } = useAuth()

  if (!checkPermissions(permissions, orValidation)) {
    return forbiddenElement ?? null
  }

  return <>{children}</>
}

export default Gated
