import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import RichTextEditor from 'components/RichTextEditor'
import { useFormik } from 'formik'
import { TextField } from '@mui/material'
import QuestionAnswerWrapper from 'Project/features/Surveys/components/SurveyAnswer/components/QuestionAnswerWrapper'
import styles from './paragraphQuestionAnswer.module.scss'
import { type SurveyParagraphAnswerProps } from 'Project/features/Surveys/components/SurveyAnswer/types'

type FormData = 'response'

const ParagraphQuestionAnswer: FC<SurveyParagraphAnswerProps> = ({
  module,
  question,
  selected,
  onLinkWithTextBlock,
}) => {
  const { i18n, t } = useTranslation('features', { keyPrefix: 'Surveys.answer' })

  const { handleChange, handleBlur, touched, errors, values } = useFormik({
    initialValues: {
      response: question?.answer?.response,
    },
    validateOnChange: false,
    onSubmit: () => {},
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
    <QuestionAnswerWrapper
      module={module}
      question={question}
      selected={selected}
      onLinkWithTextBlock={onLinkWithTextBlock}
    >
      <div className={styles.content}>
        <div className={styles.title}>{question.title}</div>
        <RichTextEditor onChange={() => null} disabled value={question?.description} />
        <TextField
          multiline
          type="textarea"
          disabled
          rows={6}
          label={t('response')}
          fullWidth
          {...getFieldProps('response')}
        />
      </div>
    </QuestionAnswerWrapper>
  )
}

export default ParagraphQuestionAnswer
