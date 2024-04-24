import React, { useCallback, useEffect, useState } from 'react'
import { type PresentationImageStepProps } from 'src/features/Project/features/PresentationTool/types'
import ImageDecorator from 'components/ImageDecorator'
import RichTextEditor from 'components/RichTextEditor/RichTextEditor.tsx'
import PresentationStepBox from 'components/PresentationStep/components/PresentationStepBox'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import styles from './presentationImageStep.module.scss'

const PresentationImageStep: React.FC<PresentationImageStepProps> = ({
  step,
  downStep,
  upStep,
  number,
  dragProps,
  readOnly,
  onDeleteStep,
  canLinkWithTextBlocks,
  onLinkWithTextBlock,
  canAddStepsToSurveys,
  effectiveProcessId,
  module,
  selected,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'presentationTool' })
  const [currentImageData, setCurrentImageData] = useState(step.imageData)

  const { handleChange, setFieldValue, setValues, handleBlur, touched, errors, values } = useFormik(
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
    step.setImageData(currentImageData)
  }, [currentImageData])

  useEffect(() => {
    step.setTitle(values.title)
    step.setComments(values.comments)
  }, [values])

  useEffect(() => {
    setCurrentImageData(step.imageData)
    void setValues(step.currentValues)
  }, [step, setValues])

  return (
    <PresentationStepBox
      step={step}
      upStep={upStep}
      downStep={downStep}
      dragProps={dragProps}
      number={number}
      readOnly={readOnly}
      onDeleteStep={onDeleteStep}
      canAddStepsToSurveys={canAddStepsToSurveys}
      canLinkWithTextBlocks={canLinkWithTextBlocks}
      effectiveProcessId={effectiveProcessId}
      onLinkWithTextBlock={onLinkWithTextBlock}
      module={module}
      selected={selected}
    >
      <div className={styles.imageStepContainer}>
        <TextField label={t('stepTitle')} {...getFieldProps('title')} disabled={readOnly} />
        <div />
        <ImageDecorator
          image={step.image}
          onElementsChange={(data: any) => {
            setCurrentImageData(data)
          }}
          readOnly={readOnly}
          initialData={currentImageData}
          canLinkWithTextBlocks={canLinkWithTextBlocks}
          onTextBlockElementSelection={onLinkWithTextBlock}
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

export default PresentationImageStep
