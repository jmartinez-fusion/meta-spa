import { type FC } from 'react'
import { type TextBlockReferencesProps } from 'Project/features/TextBlocks/components/TextBlockReferences/types'
import { useTranslation } from 'react-i18next'
import { AccountTreeOutlined, ChecklistOutlined, ChevronRightRounded } from '@mui/icons-material'
import { VIEW_CURRENT_PROCESS_PRESENTATION, VIEW_FUTURE_PROCESS_PRESENTATION } from 'permissions'
import useProject from 'Project/hooks/useProject.ts'
import { FUTURE_PROCESSES_PATHS } from 'Project/features/FutureProcesses/routes.tsx'
import { CURRENT_PROCESSES_PATHS } from 'Project/features/CurrentProcesses/routes.tsx'
import { SvgIcon } from '@mui/material'
import styles from './textBlockReferences.module.scss'
import Gated from 'components/Gated'
import { useNavigate } from 'react-router-dom'

const TextBlockReference: FC<TextBlockReferencesProps> = ({ references = [] }) => {
  const { t } = useTranslation('features', { keyPrefix: 'TextBlocks' })
  const { project } = useProject()
  const navigate = useNavigate()
  const referencesBreadcrumb = references?.map((reference) => {
    const item: any = {}
    if (reference.type === 'survey_answer') {
      item.icon = <ChecklistOutlined />
      item.redirectPermission = 'yes'
      item.redirectLabel = t('goToSurvey')
      item.items = [
        reference.referenceData?.surveyName,
        t(`modules.${reference.referenceData?.module}`),
        reference.referenceData?.questionName,
        reference.referenceData?.responderName,
      ].filter((item) => !!item)

      if (reference.referenceData?.module === 'future_state_process') {
        item.redirectPath = FUTURE_PROCESSES_PATHS.SURVEY_ANSWER.replace(
          ':projectId',
          project?.id ?? ''
        )
          .replace(':surveyId', reference.referenceData?.surveyId ?? '')
          .replace(':answerId', reference.id ?? '')
      }

      if (reference.referenceData?.module === 'current_state_process') {
        item.redirectPath = CURRENT_PROCESSES_PATHS.SURVEY_ANSWER.replace(
          ':projectId',
          project?.id ?? ''
        )
          .replace(':surveyId', reference.referenceData?.surveyId ?? '')
          .replace(':answerId', reference.id ?? '')
      }
    }

    if (reference.type === 'presentation_step') {
      item.icon = <AccountTreeOutlined />
      item.redirectLabel = t('goToPresentation')
      item.items = [
        reference.referenceData?.processName,
        t(`modules.${reference.referenceData?.module}`),
        t('presentationStep', { number: reference.referenceData?.stepNumber }),
      ].filter((item) => !!item)

      if (reference.referenceData?.module === 'future_state_process') {
        item.redirectPermission = VIEW_FUTURE_PROCESS_PRESENTATION
        item.redirectPath = FUTURE_PROCESSES_PATHS.VIEW_PRESENTATION.replace(
          ':projectId',
          project?.id ?? ''
        ).replace(':futureProcessId', reference.referenceData?.processId ?? '')
      }

      if (reference.referenceData?.module === 'current_state_process') {
        item.redirectPermission = VIEW_CURRENT_PROCESS_PRESENTATION
        item.redirectPath = CURRENT_PROCESSES_PATHS.VIEW_PRESENTATION.replace(
          ':projectId',
          project?.id ?? ''
        ).replace(':futureProcessId', reference.referenceData?.processId ?? '')
      }
    }

    return item
  })

  if (references.length === 0) {
    return null
  }

  return (
    <div className={styles.referencesContainer}>
      <div className={styles.sectionTitle}>{t('references')}</div>
      {referencesBreadcrumb?.map((referenceBreadcrumb) => {
        return (
          <div key={referenceBreadcrumb.path} className={styles.reference}>
            <SvgIcon fontSize="inherit">{referenceBreadcrumb.icon}</SvgIcon>
            <div className={styles.breadCrumbItems}>
              {referenceBreadcrumb.items?.map((breadCrumbItem: string, i: number) => {
                if (i === 0) {
                  return (
                    <span key={breadCrumbItem} className={styles.titleItem}>
                      {breadCrumbItem}
                    </span>
                  )
                }
                return <span key={breadCrumbItem}>{' | ' + breadCrumbItem}</span>
              })}
            </div>
            <Gated permissions={referenceBreadcrumb.redirectPermission}>
              <div
                className={styles.redirect}
                onClick={() => {
                  navigate(referenceBreadcrumb.redirectPath)
                }}
              >
                {referenceBreadcrumb.redirectLabel}
                <div className={styles.redirectIcon}>
                  <SvgIcon fontSize="inherit">
                    <ChevronRightRounded />
                  </SvgIcon>
                </div>
              </div>
            </Gated>
          </div>
        )
      })}
    </div>
  )
}

export default TextBlockReference
