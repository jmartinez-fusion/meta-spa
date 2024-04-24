import { RESET_PASSWORD_ACTION } from 'src/features/Auth/constants.ts'
import { useSearchParams } from 'react-router-dom'

interface UseResetPasswordParamsResult {
  email: string
  code: string
  action: RESET_PASSWORD_ACTION
}

export default function useResetPasswordParams(): UseResetPasswordParamsResult {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ? decodeURI(searchParams.get('email') ?? '') : ''
  const code = searchParams.get('code') ?? ''

  const actionParam = decodeURI(searchParams.get('action') ?? '')
  let action: RESET_PASSWORD_ACTION

  if (
    actionParam !== RESET_PASSWORD_ACTION.CREATE_PASSWORD_ACTION &&
    actionParam !== RESET_PASSWORD_ACTION.CHANGE_PASSWORD_ACTION
  ) {
    action = RESET_PASSWORD_ACTION.CHANGE_PASSWORD_ACTION
  } else {
    action = actionParam
  }

  return { email, action, code }
}
