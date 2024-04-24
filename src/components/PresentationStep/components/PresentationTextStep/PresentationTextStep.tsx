import React, { useCallback, useEffect } from 'react'
import { type PresentationTextStepProps } from 'src/features/Project/features/PresentationTool/types'
import { TextField } from '@mui/material'
import RichTextEditor from 'components/RichTextEditor/RichTextEditor.tsx'
import PresentationStepBox from 'components/PresentationStep/components/PresentationStepBox'
import styles from './presentationTextStep.module.scss'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'

const PresentationTextStep: React.FC<PresentationTextStepProps> = ({
  step,
  downStep,
  upStep,
  dragProps,
  readOnly,
  onDeleteStep,
  number,
  canLinkWithTextBlocks,
  onLinkWithTextBlock,
  canAddStepsToSurveys,
  module,
  effectiveProcessId,
  selected,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })

  const { handleChange, setValues, setFieldValue, handleBlur, touched, errors, values } = useFormik(
    {
      initialValues: step.currentValues,
      validateOnChange: false,
      onSubmit: () => {},
    }
  )

  const getFieldProps = useCallback(
    (name: string) => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        helperText: hasTouched && error ? t(error) : '',
        onBlur: () => {},
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values]
  )

  useEffect(() => {
    step.setTitle(values.title)
    step.setComments(values.comments)
    step.setDescription(values.description)
    step.setProcessTitle(values.processTitle)
  }, [step, values])

  useEffect(() => {
    void setValues(step.currentValues)
  }, [step, setValues])

  return (
    <PresentationStepBox
      step={step}
      readOnly={readOnly}
      upStep={upStep}
      downStep={downStep}
      dragProps={dragProps}
      number={number}
      canAddStepsToSurveys={canAddStepsToSurveys}
      onDeleteStep={onDeleteStep}
      canLinkWithTextBlocks={canLinkWithTextBlocks}
      onLinkWithTextBlock={onLinkWithTextBlock}
      effectiveProcessId={effectiveProcessId}
      module={module}
      selected={selected}
    >
      <div className={styles.textStepContainer}>
        <TextField label={t('stepTitle')} {...getFieldProps('title')} disabled={readOnly} />
        <div />
        <RichTextEditor
          label={t('description')}
          disabled={readOnly}
          {...getFieldProps('description')}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onChange={async (value) => await setFieldValue('description', value)}
        />
        <RichTextEditor
          label={t('comments')}
          {...getFieldProps('comments')}
          disabled={readOnly}
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onChange={async (value) => await setFieldValue('comments', value)}
        />
        {module === 'current_state_process' && (
          <TextField
            label={t('processTitle')}
            {...getFieldProps('processTitle')}
            disabled={readOnly}
          />
        )}
      </div>
    </PresentationStepBox>
  )
}

export default PresentationTextStep
