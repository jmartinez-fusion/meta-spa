import React from 'react'
import { type PresentationStepProps } from 'src/features/Project/features/PresentationTool/types'
import PresentationImageStep from 'components/PresentationStep/components/PresentationImageStep/PresentationImageStep.tsx'
import PresentationTextStep from 'components/PresentationStep/components/PresentationTextStep/PresentationTextStep.tsx'

const PresentationStep: React.FC<PresentationStepProps> = ({
  step,
  number,
  readOnly = false,
  downStep,
  dragProps,
  upStep,
  onDeleteStep,
  canLinkWithTextBlocks,
  canAddStepsToSurveys,
  onLinkWithTextBlock,
  effectiveProcessId,
  module,
  selected,
}) => {
  const props = {
    step,
    upStep,
    readOnly,
    downStep,
    onDeleteStep,
    dragProps,
    number,
    canLinkWithTextBlocks,
    canAddStepsToSurveys,
    onLinkWithTextBlock,
    module,
    selected,
    effectiveProcessId,
  }

  switch (step.type) {
    case 'image':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return <PresentationImageStep {...props} />

    case 'text':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return <PresentationTextStep {...props} />

    default:
      return null
  }
}

export default PresentationStep
