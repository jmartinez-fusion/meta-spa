import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type SurveyDropdownQuestionProps } from 'Project/features/RespondingSurvey/components/SurveyQuestion/types'
import QuestionWrapper from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/QuestionWrapper'
import styles from './dropdownQuestion.module.scss'
import RichTextEditor from 'components/RichTextEditor'
import Select from 'components/Select'
import { useFormik } from 'formik'
import SurveyDropdownQuestionFormSchema from 'Project/features/RespondingSurvey/components/SurveyQuestion/schema/SurveyDropdownQuestionFormSchema.ts'
import entitiesToOptions from 'utils/entityToOptions.ts'
import { surveyDropdownQuestionToApi } from 'Project/features/RespondingSurvey/transformers'

type FormData = 'response'

const DropdownQuestion: FC<SurveyDropdownQuestionProps> = ({
  module,
  question,
  onNext,
  onPrevious,
}) => {
  const { i18n, t } = useTranslation('features', { keyPrefix: 'RespondingSurvey' })

  const { handleChange, handleSubmit, handleBlur, touched, errors, values } = useFormik({
    initialValues: {
      response: question?.answer?.response,
    },
    validateOnChange: false,
    validationSchema: SurveyDropdownQuestionFormSchema,
    onSubmit: (data) => {
      if (onNext) {
        onNext(surveyDropdownQuestionToApi({ ...data, question }))
      }
    },
  })

  const getFieldProps = useCallback(
    (name: FormData) => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        helperText: hasTouched && error ? i18n.t(error) : '',
        onBlur: () => {},
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values]
  )

  return (
    <QuestionWrapper
      module={module}
      question={question}
      onNext={handleSubmit}
      onPrevious={onPrevious}
    >
      <div className={styles.content}>
        <div className={styles.title}>{question.title}</div>
        <RichTextEditor onChange={() => null} disabled value={question?.description} />
        <Select
          label={t('response')}
          placeholder={t('select')}
          options={entitiesToOptions(
            question?.dropdownOptions?.map((option: string) => {
              return {
                id: option,
                name: option,
              }
            })
          )}
          fullWidth
          {...getFieldProps('response')}
        />
      </div>
    </QuestionWrapper>
  )
}

export default DropdownQuestion
