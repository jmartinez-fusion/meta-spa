import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const ValidateSessionSchema = (CONFIRMATION_CODE_LENGTH: number): any => {
  const { t } = useTranslation('features', { keyPrefix: 'Auth' })

  return Yup.object({
    email: Yup.string()
      .email(t('fields.email.validationEmail'))
      .max(255)
      .required(t('fields.email.validationRequired')),
    code: Yup.string()
      .max(
        CONFIRMATION_CODE_LENGTH,
        t('fields.code.validationLength', { length: CONFIRMATION_CODE_LENGTH })
      )
      .min(
        CONFIRMATION_CODE_LENGTH,
        t('fields.code.validationLength', { length: CONFIRMATION_CODE_LENGTH })
      )
      .required(t('fields.code.validationRequired')),
  })
}

export default ValidateSessionSchema
