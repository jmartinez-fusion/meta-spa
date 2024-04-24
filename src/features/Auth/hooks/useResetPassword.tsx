import config from 'src/config.tsx'
import useFetch from 'src/hooks/useFetch'
import Session from 'src/features/Auth/models/Session'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

interface ResetPasswordProps {
  doConfirmCode: (email: string, code: string) => Promise<any>
  doResetPassword: (
    email: string,
    password: string,
    passwordConfirm: string,
    token: string,
    action: string
  ) => Promise<any>
}

export default function useResetPassword(): ResetPasswordProps {
  const { t } = useTranslation('features', { keyPrefix: 'Auth' })
  const { doFetch: doConfirmCodeFetch } = useFetch(
    `${config.api.msAuth.baseUrl}/auth/validate-code`,
    {
      method: 'POST',
    }
  )
  const { doFetch: doResetPasswordFetch } = useFetch(
    `${config.api.msAuth.baseUrl}/auth/change-password`,
    {
      method: 'POST',
    }
  )

  const doConfirmCode = async (email: string, code: string): Promise<any> => {
    try {
      const data = { email, code, platform: config.api.platform }
      const response = await doConfirmCodeFetch({ data })

      return await Promise.resolve(Session.fromAPI(response.data))
    } catch (err: any) {
      return await Promise.reject(err)
    }
  }

  const doResetPassword = async (
    email: string,
    password: string,
    passwordConfirm: string,
    token: string,
    action = ''
  ): Promise<any> => {
    try {
      const data = {
        email,
        newPassword: password,
        confirmPassword: passwordConfirm,
        platform: config.api.platform,
      }

      const response = await doResetPasswordFetch({
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      enqueueSnackbar(t('passwordActionSuccessfully', { action }), {
        preventDuplicate: false,
        variant: 'success',
        autoHideDuration: 2000,
      })

      return await Promise.resolve(Session.fromAPI(response.data))
    } catch (err) {
      return await Promise.reject(err)
    }
  }

  return { doResetPassword, doConfirmCode }
}
