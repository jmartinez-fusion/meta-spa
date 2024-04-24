import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const ResetPasswordFormSchema = (): any => {
  const { t } = useTranslation('features', { keyPrefix: 'Auth' })

  const passwordValidation = Yup.string()
    .required(t('fields.password.validationRequired'))
    .min(8, t('fields.password.validationMinLength', { length: 8 }))
    .matches(/[A-Z]/, t('fields.password.validationUppercase'))
    .matches(/[a-z]/, t('fields.password.validationLowercase'))
    .matches(/\d/, t('fields.password.validationNumber'))
    .matches(/[!@#$%^&*(),.?":{}|<>\-_/]/, t('fields.password.validationSpecialChar'))

  return Yup.object().shape({
    email: Yup.string()
      .email(t('fields.email.validationEmail'))
      .max(255)
      .required(t('fields.email.validationRequired')),
    password: passwordValidation,
    passwordConfirm: Yup.string()
      .required(t('fields.password.validationRequired'))
      .oneOf([Yup.ref('password'), ''], t('fields.password.validationMatch')),
  })
}

export default ResetPasswordFormSchema
