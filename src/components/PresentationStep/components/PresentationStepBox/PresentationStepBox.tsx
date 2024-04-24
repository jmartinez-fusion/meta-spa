import React from 'react'
import { type PresentationStepBoxProps } from 'src/features/Project/features/PresentationTool/types'
import { DeleteForeverOutlined, DragHandleRounded } from '@mui/icons-material'
import { SvgIcon } from '@mui/material'
import styles from './presentationStepBox.module.scss'
import LinkWithTextBlockAction from 'Project/components/LinkWithTextBlockAction/LinkWithTextBlockAction.tsx'
import c from 'classnames'
import AddPresentationStepToSurvey from 'Project/components/AddPresentationStepToSurvey'
import StepAttachments from 'components/PresentationStep/components/StepAttachments'

const PresentationStepBox: React.FC<PresentationStepBoxProps> = ({
  children,
  step,
  // downStep,
  number,
  readOnly,
  dragProps,
  // upStep,
  onDeleteStep,
  canLinkWithTextBlocks,
  onLinkWithTextBlock,
  canAddStepsToSurveys,
  module,
  effectiveProcessId,
  selected,
}) => {
  return (
    <div className={c(styles.presentationStep, selected && styles.selected)}>
      <div className={styles.actions}>
        <div className={styles.stepNumber}>{number ?? ''}</div>
        {!readOnly && (
          <>
            <div className={styles.changeOrder}>
              <div {...dragProps}>
                <SvgIcon fontSize="inherit" className={styles.changeOrderAction}>
                  <DragHandleRounded />
                </SvgIcon>
              </div>

              {/* {downStep && ( */}
              {/*  <SvgIcon fontSize="inherit" className={styles.changeOrderAction} onClick={downStep}> */}
              {/*    <North /> */}
              {/*  </SvgIcon> */}
              {/* )} */}
              {/* {upStep && ( */}
              {/*  <SvgIcon fontSize="inherit" className={styles.changeOrderAction} onClick={upStep}> */}
              {/*    <South /> */}
              {/*  </SvgIcon> */}
              {/* )} */}
            </div>
            <div className={styles.deleteContainer}>
              <SvgIcon fontSize="inherit" className={styles.deleteAction} onClick={onDeleteStep}>
                <DeleteForeverOutlined />
              </SvgIcon>
            </div>
          </>
        )}
      </div>
      <div className={styles.stepContent}>
        {children}
        <StepAttachments attachments={step.attachments} />
      </div>

      <div className={styles.externalActions}>
        {canLinkWithTextBlocks && onLinkWithTextBlock && (
          <LinkWithTextBlockAction
            onLinkWithTextBlock={() => {
              onLinkWithTextBlock({})
            }}
          />
        )}
        {canAddStepsToSurveys && (
          <AddPresentationStepToSurvey
            step={step}
            module={module}
            effectiveProcessId={effectiveProcessId}
          />
        )}
      </div>
    </div>
  )
}

export default PresentationStepBox
