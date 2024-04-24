import * as Yup from 'yup'
import i18next from 'i18next'

const FutureProcessSchema = Yup.object()
  .shape({
    name: Yup.string().required('validations:required'),
    parentFutureProcess: Yup.string(),
    associatedSPC: Yup.string(),
    code: Yup.string().required('validations:required'),
  })
  .test(
    'at-least-one-field',
    'Either parentFutureProcess or associatedSPC is required',
    function (values) {
      const { parentFutureProcess, associatedSPC } = values

      if (!parentFutureProcess && !associatedSPC) {
        return this.createError({
          path: 'parentFutureProcess',
          message: i18next.t(
            'features:ProcessSelection.parentFutureProcessOrAssociatedSpcRequired'
          ),
        })
      }

      return true
    }
  )
  .test(
    'at-least-one-field',
    'Either parentFutureProcess or associatedSPC is required',
    function (values) {
      const { parentFutureProcess, associatedSPC } = values

      if (!parentFutureProcess && !associatedSPC) {
        return this.createError({
          path: 'associatedSPC',
          message: i18next.t(
            'features:ProcessSelection.parentFutureProcessOrAssociatedSpcRequired'
          ),
        })
      }

      return true
    }
  )

export default FutureProcessSchema
