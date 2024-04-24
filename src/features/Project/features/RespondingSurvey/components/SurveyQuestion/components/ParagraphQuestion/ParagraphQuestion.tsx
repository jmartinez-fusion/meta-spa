import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type SurveyParagraphQuestionProps } from 'Project/features/RespondingSurvey/components/SurveyQuestion/types'
import QuestionWrapper from 'Project/features/RespondingSurvey/components/SurveyQuestion/components/QuestionWrapper'
import RichTextEditor from 'components/RichTextEditor'
import { useFormik } from 'formik'
import SurveyParagraphQuestionFormSchema from 'Project/features/RespondingSurvey/components/SurveyQuestion/schema/SurveyParagraphQuestionFormSchema.ts'
import { TextField } from '@mui/material'
import { surveyParagraphQuestionToApi } from 'Project/features/RespondingSurvey/transformers'
import styles from './paragraphQuestion.module.scss'

type FormData = 'response'

const ParagraphQuestion: FC<SurveyParagraphQuestionProps> = ({
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
    validationSchema: SurveyParagraphQuestionFormSchema,
    onSubmit: (data) => {
      if (onNext) {
        onNext(surveyParagraphQuestionToApi({ ...data, question }))
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
        <TextField
          multiline
          type="textarea"
          rows={6}
          label={t('response')}
          fullWidth
          {...getFieldProps('response')}
        />
      </div>
    </QuestionWrapper>
  )
}

export default ParagraphQuestion
