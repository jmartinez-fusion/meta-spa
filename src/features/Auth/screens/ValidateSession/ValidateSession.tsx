import { useState, type FC, useCallback } from 'react'
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import GenericError from 'components/GenericError'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from '@mui/material'
import PublicScreenTitle from 'src/components/PublicScreenTitle'
import RICIBs from 'react-individual-character-input-boxes'
import { PATHS } from 'src/features/Auth/routes.tsx'
import useResetPassword from 'src/features/Auth/hooks/useResetPassword'
import useBrowserSession from 'src/features/Auth/hooks/useBrowserSession'
import ValidateSessionSchema from 'src/features/Auth/schema/ValidateSessionSchema'
import useAuth from 'features/Auth/hooks/useAuth.ts'
import useResetPasswordParams from 'src/features/Auth/hooks/useResetPasswordParams.tsx'
import styles from './validateSession.module.scss'

const CONFIRMATION_CODE_LENGTH = 6

const ValidateSession: FC<{
  goBackPath?: string
  nextPath?: string
  loginAfterValidate?: boolean
}> = ({
  goBackPath = `/auth/${PATHS.FORGOT_PASSWORD}`,
  nextPath = `/auth/${PATHS.RESET_PASSWORD}`,
  loginAfterValidate = false,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { initSession } = useAuth()
  const browserRecoveryPasswordSession = useBrowserSession('resetPasswordSession')
  const { doConfirmCode } = useResetPassword()
  const { t } = useTranslation('features', { keyPrefix: 'Auth' })
  const [, setSearchParams] = useSearchParams()
  const { email, action, code } = useResetPasswordParams()

  const handleGoBack = useCallback(() => {
    navigate(`${goBackPath}${email && `?email=${encodeURIComponent(email)}&action=${action}`}`)
  }, [goBackPath])

  const confirmCode = useCallback(
    async (email: string, code: string): Promise<any> => {
      try {
        const session = await doConfirmCode(email, code)

        if (loginAfterValidate) {
          initSession(session)
        } else {
          browserRecoveryPasswordSession.persistSession(session)
        }

        return await Promise.resolve(session)
      } catch (e) {
        return await Promise.reject(e)
      }
    },
    [browserRecoveryPasswordSession, doConfirmCode, code, email, setSearchParams]
  )

  const formik = useFormik({
    initialValues: {
      email: decodeURI(email),
      code,
      submit: null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ValidateSessionSchema(CONFIRMATION_CODE_LENGTH),
    onSubmit: async (_values, helpers) => {
      try {
        setIsLoading(true)
        const { email, code } = formik.values
        await confirmCode(email, code ?? '')
        navigate(
          `${nextPath}?email=${encodeURIComponent(email)}&action=${encodeURIComponent(action)}`
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

  if (!email) {
    navigate(goBackPath)
  }

  return (
    <div className={styles.wrapper}>
      <PublicScreenTitle
        title={t('securityCode')}
        subtitle={t('codeReceived')}
        goBackPath={goBackPath}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className={styles.formContent}>
          <RICIBs
            inputProps={{ className: styles.inputStyles, placeholder: '' }}
            handleOutputString={(code) => {
              if (code.length === CONFIRMATION_CODE_LENGTH) {
                formik.setFieldValue('code', code)
                setTimeout(() => {
                  formik.submitForm()
                }, 10)
              }
            }}
            inputRegExp={/^[0-9]$/}
            amount={CONFIRMATION_CODE_LENGTH}
            autoFocus
          />
          <Link
            className={styles.didYouNotReceiveTheEmail}
            onClick={handleGoBack}
            variant="inherit"
          >
            {t('didYouNotReceiveTheEmail')}
          </Link>
        </div>
        <GenericError error={formik.errors.submit} />
        <LoadingButton
          className={styles.actions}
          loading={isLoading}
          type="submit"
          size="large"
          fullWidth
        >
          {t('buttons.validate')}
        </LoadingButton>
      </form>
    </div>
  )
}

export default ValidateSession
