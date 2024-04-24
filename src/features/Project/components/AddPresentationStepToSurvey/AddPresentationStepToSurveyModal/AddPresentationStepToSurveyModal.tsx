import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ContentBox from 'components/ContentBox'
import ModalHeader from 'components/ModalHeader/ModalHeader.tsx'
import { useFormik } from 'formik'
import Autocomplete from 'components/Autocomplete'
import * as Yup from 'yup'
import { type AddPresentationStepToSurveyModalProps } from 'Project/components/AddPresentationStepToSurvey/AddPresentationStepToSurveyModal/types'
import styles from './addPresentationStepToSurveyModal.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import useProject from 'Project/hooks/useProject.ts'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes.tsx'
import { Button, SvgIcon } from '@mui/material'
import { ChevronRightRounded } from '@mui/icons-material'

const AddPresentationStepToSurvey: React.FC<AddPresentationStepToSurveyModalProps> = ({
  step,
  module,
  onClose,
  effectiveProcessId,
}) => {
  const { t, i18n } = useTranslation('common')
  const navigate = useNavigate()
  const { futureProcessId, currentProcessId } = useParams()
  const { setPresentationStepForSurvey, project } = useProject()
  const currentStateCreationRedirectPath = CURRENT_PROCESSES_PATHS.SURVEY_CREATION.replace(
    ':projectId',
    project?.id ?? ''
  ).replace(':currentProcessId', currentProcessId ?? '')
  const futureStateCreationRedirectPath = FUTURE_PROCESSES_PATHS.SURVEY_CREATION.replace(
    ':projectId',
    project?.id ?? ''
  ).replace(':futureProcessId', futureProcessId ?? '')
  const currentStateEditionRedirectPath = CURRENT_PROCESSES_PATHS.SURVEY_EDITION.replace(
    ':projectId',
    project?.id ?? ''
  ).replace(':currentProcessId', currentProcessId ?? '')
  const futureStateEditionRedirectPath = FUTURE_PROCESSES_PATHS.SURVEY_EDITION.replace(
    ':projectId',
    project?.id ?? ''
  ).replace(':futureProcessId', futureProcessId ?? '')

  const handleRedirect = (surveyId?: string): void => {
    setPresentationStepForSurvey(effectiveProcessId ?? '', step)

    if (surveyId) {
      if (module === 'current_state_process') {
        navigate(currentStateEditionRedirectPath.replace(':surveyId', surveyId ?? ''))
      }

      if (module === 'future_state_process') {
        navigate(futureStateEditionRedirectPath.replace(':surveyId', surveyId ?? ''))
      }
    } else {
      if (module === 'current_state_process') {
        navigate(currentStateCreationRedirectPath)
      }

      if (module === 'future_state_process') {
        navigate(futureStateCreationRedirectPath)
      }
    }
  }

  const { handleChange, setFieldValue, handleBlur, touched, handleSubmit, errors, values } =
    useFormik({
      initialValues: { survey: undefined },
      validationSchema: Yup.object({
        survey: Yup.object().required('validations:required'),
      }),
      onSubmit: (data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        handleRedirect(data.survey?.value)
      },
    })

  const getFieldProps = useCallback(
    (name: 'survey') => {
      const hasTouched = touched[name]
      const error = errors[name]

      return {
        name,
        value: values[name],
        error: !!(hasTouched && error),
        helperText: hasTouched && error ? i18n.t(error) : '',
        onBlur: () => {},
        onChange: handleChange,
      }
    },
    [touched, errors, handleBlur, handleChange, values]
  )

  return (
    <ContentBox isModal>
      <ModalHeader onClose={onClose} title={t('addQuestionToSurvey')} />
      <div className={styles.content}>
        <Autocomplete
          label={t('selectSurveyToAddQuestion')}
          resourceName="surveys"
          filterName="title"
          extraFilters={{ module, statuses: 'pending' }}
          {...getFieldProps('survey')}
          onChange={(_e: any, value: string) => {
            void setFieldValue('survey', value)
          }}
        />
        <div className={styles.or}>{t('or')}</div>
        <div
          className={styles.redirect}
          onClick={() => {
            handleRedirect()
          }}
        >
          {t('newSurvey')}
          <div className={styles.redirectIcon}>
            <SvgIcon fontSize="inherit">
              <ChevronRightRounded />
            </SvgIcon>
          </div>
        </div>
        <div className={styles.actions}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*   @ts-expect-error */}
          <Button onClick={handleSubmit}>{t('next')}</Button>
        </div>
      </div>
    </ContentBox>
  )
}

export default AddPresentationStepToSurvey
