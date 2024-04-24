import { useState, type FC } from 'react'
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import GenericError from 'components/GenericError'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import PublicScreenTitle from 'src/components/PublicScreenTitle'
import { PATHS } from 'src/features/Auth/routes.tsx'
import useResetPassword from 'src/features/Auth/hooks/useResetPassword'
import useBrowserSession from 'src/features/Auth/hooks/useBrowserSession'
import useAuth from 'src/features/Auth/hooks/useAuth.ts'
import ResetPasswordFormSchema from 'src/features/Auth/schema/ResetPasswordFormSchema.ts'
import PasswordTextField from 'components/PasswordTextField'
import { DASHBOARD } from 'src/utils/constants.ts'
import styles from './changePassword.module.scss'
import useResetPasswordParams from 'src/features/Auth/hooks/useResetPasswordParams.tsx'

const ForgotPassword: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { initSession } = useAuth()
  const { activeSession, clearSession } = useBrowserSession('resetPasswordSession')
  const resetPasswordSession = activeSession()
  const { doResetPassword } = useResetPassword()
  const { t } = useTranslation('features', { keyPrefix: 'Auth' })

  const { email, action } = useResetPasswordParams()

  const goBackPath = `/auth/${PATHS.VALIDATE_SESSION}${
    email && `?email=${encodeURIComponent(email)}&action=${encodeURIComponent(action)}`
  }`

  const formik = useFormik({
    initialValues: {
      email: decodeURI(email ?? ''),
      password: '',
      passwordConfirm: '',
      submit: null,
    },
    validationSchema: ResetPasswordFormSchema(),
    onSubmit: async (values, helpers) => {
      try {
        setIsLoading(true)
        const { email, password, passwordConfirm } = values

        const session = await doResetPassword(
          email,
          password,
          passwordConfirm,
          resetPasswordSession?.accessToken ?? '',
          action
        )
        initSession(session)
        clearSession()
        navigate(DASHBOARD)
      } catch (err: any) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err ?? t('common:genericError') })
        helpers.setSubmitting(false)
      } finally {
        setIsLoading(false)
      }
    },
  })

  if (!email || !resetPasswordSession) {
    navigate(goBackPath)
  }

  return (
    <div className={styles.wrapper}>
      <PublicScreenTitle
        title={t('newPassword')}
        subtitle={t('enterYourNewPassword')}
        goBackPath={goBackPath}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className={styles.formContent}>
          <PasswordTextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={t('passwordShape')}
            label={t('fields.password.label')}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            autoFocus
          />
          <PasswordTextField
            error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
            fullWidth
            helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            label={t('fields.passwordConfirm.label')}
            name="passwordConfirm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
          />
        </div>
        <GenericError error={formik.errors.submit} />
        <LoadingButton
          className={styles.actions}
          fullWidth
          size="large"
          type="submit"
          loading={isLoading}
        >
          {t(`buttons.${action}`)}
        </LoadingButton>
      </form>
    </div>
  )
}

export default ForgotPassword
