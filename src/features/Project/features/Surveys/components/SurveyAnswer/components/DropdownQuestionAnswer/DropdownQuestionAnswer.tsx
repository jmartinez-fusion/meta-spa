import { type FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import RichTextEditor from 'components/RichTextEditor'
import { type SurveyDropdownAnswerProps } from 'Project/features/Surveys/components/SurveyAnswer/types'
import Select from 'components/Select'
import { useFormik } from 'formik'
import QuestionAnswerWrapper from 'Project/features/Surveys/components/SurveyAnswer/components/QuestionAnswerWrapper'
import entitiesToOptions from 'utils/entityToOptions.ts'
import styles from './dropdownQuestionAnswer.module.scss'

type FormData = 'response'

const DropdownQuestionAnswer: FC<SurveyDropdownAnswerProps> = ({
  module,
  question,
  onLinkWithTextBlock,
  selected,
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
      selected={selected}
      question={question}
      onLinkWithTextBlock={onLinkWithTextBlock}
    >
      <div className={styles.content}>
        <div className={styles.title}>{question.title}</div>
        <RichTextEditor onChange={() => null} disabled value={question?.description} />
        <Select
          label={t('response')}
          placeholder={t('select')}
          disabled
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
    </QuestionAnswerWrapper>
  )
}

export default DropdownQuestionAnswer
