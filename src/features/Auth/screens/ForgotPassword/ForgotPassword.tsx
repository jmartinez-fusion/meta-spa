import { useState, type FC } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import { TextField } from '@mui/material'
import GenericError from 'components/GenericError'
import { useTranslation } from 'react-i18next'
import PublicScreenTitle from 'src/components/PublicScreenTitle'
import useStartPasswordRecovery from 'src/features/Auth/hooks/useStartPasswordRecovery'
import ForgotPasswordFormSchema from 'src/features/Auth/schema/ForgotPasswordFormSchema.ts'
import { PATHS } from 'src/features/Auth/routes.tsx'
import styles from './forgotPassword.module.scss'
import useResetPasswordParams from 'src/features/Auth/hooks/useResetPasswordParams.tsx'

const ForgotPassword: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { startRecovery } = useStartPasswordRecovery()
  const { t } = useTranslation('features', { keyPrefix: 'Auth' })
  const [, setSearchParams] = useSearchParams()
  const { email, action } = useResetPasswordParams()

  const formik = useFormik({
    initialValues: {
      email,
      submit: null,
    },
    validationSchema: ForgotPasswordFormSchema(),
    onSubmit: async (values, helpers) => {
      try {
        setIsLoading(true)
        const { email } = values
        await startRecovery(email)
        setSearchParams({ email })
        navigate(
          `/auth/${PATHS.VALIDATE_SESSION}?email=${encodeURIComponent(email)}&action=${action}`
        )
      } catch (err) {
        helpers.setStatus({ success: false })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        helpers.setErrors({ submit: err })
        helpers.setSubmitting(false)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className={styles.wrapper}>
      <PublicScreenTitle
        title={t('forgotPassword')}
        subtitle={t('forgotPasswordSubtitle')}
        goBackPath={`/auth/${PATHS.LOGIN}`}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className={styles.formContent}>
          <div className={styles.description}>{t('forgotPasswordDescription')}</div>
          <TextField
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label={t('fields.email.label')}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            disabled={isLoading}
            autoFocus
          />
        </div>
        <GenericError error={formik.errors.submit} />
        <div className={styles.actions}>
          <LoadingButton fullWidth type="submit" loading={isLoading}>
            {t('buttons.sendEmail')}
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
